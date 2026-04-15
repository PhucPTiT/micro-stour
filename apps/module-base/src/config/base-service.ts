import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type CreateAxiosDefaults,
    type InternalAxiosRequestConfig,
} from "axios";

export type RequestInterceptor = (
    config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

export type RequestErrorInterceptor = (error: AxiosError) => Promise<never>;

export type ResponseSuccessInterceptor<T = unknown> = (response: T) => T | Promise<T>;

export type ResponseErrorInterceptor = (error: AxiosError) => Promise<never>;

export type ServiceRequestOptions<TPayload = unknown> = AxiosRequestConfig<TPayload> & {
    baseURL?: string;
};

export abstract class BaseService {
    protected readonly axiosInstance: AxiosInstance;
    protected readonly headers: Record<string, string>;
    private readonly requestInterceptors: RequestInterceptor[] = [];
    private readonly responseInterceptors: ResponseSuccessInterceptor[] = [];
    private readonly requestErrorInterceptors: RequestErrorInterceptor[] = [];
    private readonly responseErrorInterceptors: ResponseErrorInterceptor[] = [];

    protected constructor(config?: CreateAxiosDefaults) {
        this.axiosInstance = axios.create(config);
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(config?.headers as Record<string, string> | undefined),
        };
    }

    public get client() {
        return this.axiosInstance;
    }

    public setBaseUrl(baseURL: string) {
        this.axiosInstance.defaults.baseURL = baseURL;
    }

    public setAuthorization(token: string) {
        this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    public delAuthorization() {
        delete this.axiosInstance.defaults.headers.common.Authorization;
    }

    public addRequestInterceptor(onFulfilled?: RequestInterceptor, onRejected?: RequestErrorInterceptor) {
        if (onFulfilled) {
            this.requestInterceptors.push(onFulfilled);
        }

        if (onRejected) {
            this.requestErrorInterceptors.push(onRejected);
        }
    }

    public addResponseInterceptor(onFulfilled?: ResponseSuccessInterceptor, onRejected?: ResponseErrorInterceptor) {
        if (onFulfilled) {
            this.responseInterceptors.push(onFulfilled);
        }

        if (onRejected) {
            this.responseErrorInterceptors.push(onRejected);
        }
    }

    public get<TResponse = unknown>(url: string, config?: ServiceRequestOptions) {
        return this.fetchData<TResponse>(url, { ...config, method: "GET" });
    }

    public post<TResponse = unknown, TPayload = unknown>(
        url: string,
        data?: TPayload,
        config?: ServiceRequestOptions<TPayload>,
    ) {
        return this.fetchData<TResponse, TPayload>(url, { ...config, method: "POST", data });
    }

    public put<TResponse = unknown, TPayload = unknown>(
        url: string,
        data?: TPayload,
        config?: ServiceRequestOptions<TPayload>,
    ) {
        return this.fetchData<TResponse, TPayload>(url, { ...config, method: "PUT", data });
    }

    public patch<TResponse = unknown, TPayload = unknown>(
        url: string,
        data?: TPayload,
        config?: ServiceRequestOptions<TPayload>,
    ) {
        return this.fetchData<TResponse, TPayload>(url, { ...config, method: "PATCH", data });
    }

    public delete<TResponse = unknown>(url: string, config?: ServiceRequestOptions) {
        return this.fetchData<TResponse>(url, { ...config, method: "DELETE" });
    }

    public async fetchData<TResponse = unknown, TPayload = unknown>(
        endpoint: string,
        options: ServiceRequestOptions<TPayload> = {},
    ): Promise<TResponse> {
        try {
            const isFormData = options.data instanceof FormData;
            const mergedHeaders = {
                ...this.headers,
                ...(options.headers as Record<string, string> | undefined),
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
            };

            const runtimeBaseUrl = options.baseURL ?? this.axiosInstance.defaults.baseURL ?? "";
            const url = this.buildUrl(runtimeBaseUrl, endpoint);

            let requestConfig: InternalAxiosRequestConfig = {
                ...this.axiosInstance.defaults,
                ...options,
                url,
                headers: mergedHeaders,
                data: isFormData ? options.data : options.data,
            } as InternalAxiosRequestConfig;

            requestConfig = await this.handleRequest(requestConfig);

            for (const interceptor of this.requestInterceptors) {
                requestConfig = await interceptor(requestConfig);
            }

            const response = await this.axiosInstance.request<TResponse, AxiosResponse<TResponse>, TPayload>(
                requestConfig,
            );

            if (response.status === 204) {
                return null as TResponse;
            }

            const contentType = response.headers["content-type"];

            if (!contentType?.includes("application/json")) {
                throw new Error(
                    `Invalid response format: Expected JSON but received ${contentType || "unknown format"}`,
                );
            }

            let responseData = this.handleResponse(response.data) as TResponse;

            for (const interceptor of this.responseInterceptors) {
                responseData = (await interceptor(responseData)) as TResponse;
            }

            return responseData;
        } catch (error) {
            console.error("Request failed:", error);
            if (axios.isAxiosError(error)) {
                await this.runErrorInterceptors(error);
                await this.handleError(error);
            }

            throw error;
        }
    }

    protected handleRequest(config: InternalAxiosRequestConfig) {
        return config;
    }

    protected async handleRequestError(error: AxiosError) {
        return Promise.reject(error);
    }

    protected handleResponse<T = unknown>(response: T) {
        return response;
    }

    protected async handleError(error: AxiosError) {
        if (!error.response) {
            console.error("Network/CORS error: no response received from server.");
            return Promise.reject(error);
        }

        const status = error.response.status;
        const contentType = error.response.headers["content-type"];

        if (status === 401) {
            window.location.href = "/login";
        }

        if (status === 403) {
            window.location.href = "/403";
        }

        if (contentType && !contentType.includes("application/json")) {
            console.error("Unexpected response content-type:", contentType);
        }

        return Promise.reject(error);
    }

    private buildUrl(baseURL: string, endpoint: string) {
        if (/^https?:\/\//.test(endpoint)) {
            return endpoint;
        }

        if (!baseURL) {
            return endpoint;
        }

        return `${baseURL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
    }

    private async runErrorInterceptors(error: AxiosError) {
        for (const interceptor of this.responseErrorInterceptors) {
            await interceptor(error);
        }

        for (const interceptor of this.requestErrorInterceptors) {
            await interceptor(error);
        }
    }
}
