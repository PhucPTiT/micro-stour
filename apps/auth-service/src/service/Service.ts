import { z } from "zod";

/**
 * Base service response interface
 * All responses have code, message, and data fields
 */
export interface ServiceResponse<T> {
    code: string;
    message: string;
    data: T;
}

/**
 * Schema for successful responses
 */
export const ServiceResponseSuccessSchema = <T>(dataSchema: z.ZodType<T>) =>
    z.object({
        code: z.string(),
        message: z.string(),
        data: dataSchema,
    });

/**
 * Schema for error responses
 */
export const ServiceResponseErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    data: z.any().nullable(),
});

/**
 * Combined schema that can validate both success and error responses
 */
export const ServiceResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
    z.union([ServiceResponseSuccessSchema(dataSchema), ServiceResponseErrorSchema]);

/**
 * Function to validate if a response matches the expected ServiceResponse schema
 * with specific data type validation
 *
 * @param response The response object to validate
 * @param dataSchema Zod schema for the data field
 * @param serviceName Optional name of the service for better error messages
 * @returns Validated response with properly typed data
 */
export function validateResponseSchema<T>(
    response: unknown,
    dataSchema: z.ZodType<T>,
    serviceName: string = "service",
): ServiceResponse<T> {
    const schema = ServiceResponseSchema(dataSchema);
    const result = schema.safeParse(response);

    if (!result.success) {
        console.error(`Invalid response structure from ${serviceName}:`, result.error);
        throw new Error(`Invalid response structure from ${serviceName}: ${result.error.message}`);
    }

    // If this is a success response with data that requires validation
    if (result.data.code !== "500" && result.data.data !== null) {
        // Additional data validation if needed
        const dataResult = dataSchema.safeParse(result.data.data);
        if (!dataResult.success) {
            console.error(`Invalid data structure from ${serviceName}:`, dataResult.error);
            throw new Error(`Invalid data structure from ${serviceName}: ${dataResult.error.message}`);
        }
    }

    return result.data as ServiceResponse<T>;
}

/**
 * Helper function to create a typed response validator
 *
 * @param dataSchema Zod schema for the data field
 * @param serviceName Optional name of the service for better error messages
 * @returns Function that validates responses against the schema
 */
export function createResponseValidator<T>(dataSchema: z.ZodType<T>, serviceName: string = "service") {
    return (response: unknown): ServiceResponse<T> => {
        return validateResponseSchema(response, dataSchema, serviceName);
    };
}

/**
 * Example usage:
 *
 * const userSchema = z.object({
 *   id: z.number(),
 *   name: z.string(),
 *   email: z.string().email()
 * });
 *
 * const response = await fetchUserData();
 * const validatedResponse = validateResponseSchema(response, userSchema, 'userService');
 *
 * // OR using a pre-created validator:
 * const validateUserResponse = createResponseValidator(userSchema, 'userService');
 * const validatedResponse = validateUserResponse(response);
 */
