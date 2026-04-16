import type { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "@/const";
import { BaseService } from "./base-service";

const defaultConfig: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_BASE_URL ?? "",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export class HttpService extends BaseService {
    private static instance: HttpService | null = null;

    private constructor(config: CreateAxiosDefaults = defaultConfig) {
        super(config);

        this.addRequestInterceptor(this.handleRequest.bind(this), this.handleRequestError.bind(this));
        this.addResponseInterceptor(this.handleResponse.bind(this), this.handleError.bind(this));
    }

    public static getInstance(config?: CreateAxiosDefaults) {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService(config ?? defaultConfig);
        }

        return HttpService.instance;
    }

    protected override handleRequest(config: InternalAxiosRequestConfig) {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
}

export const httpService = HttpService.getInstance();
