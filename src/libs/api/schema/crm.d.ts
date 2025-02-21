/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/customer/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Customer */
        get: operations["list_customer_customer__get"];
        put?: never;
        /** Create Customer */
        post: operations["create_customer_customer__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/customer/{customer_id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Retrieve Customer */
        get: operations["retrieve_customer_customer__customer_id___get"];
        put?: never;
        post?: never;
        /** Delete Customer */
        delete: operations["delete_customer_customer__customer_id___delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/options/customer/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Customer Option */
        get: operations["list_customer_option_options_customer__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lead/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Lead */
        get: operations["list_lead_lead__get"];
        put?: never;
        /** Create Lead */
        post: operations["create_lead_lead__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lead/{lead_id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Retrieve Lead */
        get: operations["retrieve_lead_lead__lead_id___get"];
        /** Update Lead */
        put: operations["update_lead_lead__lead_id___put"];
        post?: never;
        /** Delete Lead */
        delete: operations["delete_lead_lead__lead_id___delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/options/lead/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Lead Option */
        get: operations["list_lead_option_options_lead__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lead/{lead_id}/set_status/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Set Lead Status */
        put: operations["set_lead_status_lead__lead_id__set_status__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** ContactImageURL */
        ContactImageURL: {
            /** Url */
            url: string | null;
        };
        /**
         * ContactLegalType
         * @enum {string}
         */
        ContactLegalType: "Individual" | "Partnership" | "Limited Partnership" | "Limited Liability Partnership" | "Limited Liability Company" | "Public Limited Company" | "Private Limited Company" | "Corporation" | "Nonprofit Organization" | "Cooperative" | "Trust" | "Government Agency";
        /** ContactMin */
        ContactMin: {
            /** Pk */
            pk: number;
            /** Name */
            name: string;
            legal_type: components["schemas"]["ContactLegalType"];
            image: components["schemas"]["ContactImageURL"];
            parent: components["schemas"]["ContactMin"] | null;
        };
        /** Customer */
        Customer: {
            /** Pk */
            pk: number;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Last Modified At
             * Format: date-time
             */
            last_modified_at: string;
            created_by: components["schemas"]["UserMin"];
            last_modified_by: components["schemas"]["UserMin"] | null;
            contact: components["schemas"]["ContactMin"];
        };
        /** CustomerCreate */
        CustomerCreate: {
            /** Contact Id */
            contact_id: number;
        };
        /** CustomerMin */
        CustomerMin: {
            /** Pk */
            pk: number;
            contact: components["schemas"]["ContactMin"];
        };
        /** CustomerOpt */
        CustomerOpt: {
            /** Pk */
            pk: number;
            contact: components["schemas"]["ContactMin"];
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** Lead */
        Lead: {
            /** Pk */
            pk: number;
            /** Name */
            name: string;
            /** Lead Score */
            lead_score: number;
            lead_source: components["schemas"]["LeadSource"];
            /** Contact Name */
            contact_name: string | null;
            /** Email */
            email: string | null;
            /** Address */
            address: string | null;
            /** Phone */
            phone: string | null;
            /** Customer Name */
            customer_name: string | null;
            lead_status: components["schemas"]["LeadStatus"];
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Last Modified At
             * Format: date-time
             */
            last_modified_at: string;
            created_by: components["schemas"]["UserMin"];
            last_modified_by: components["schemas"]["UserMin"] | null;
            /** Lead Id */
            lead_id: string;
            customer: components["schemas"]["CustomerMin"] | null;
            /** Tags */
            tags: components["schemas"]["TagMin"][];
        };
        /** LeadCreate */
        LeadCreate: {
            /** Name */
            name: string;
            /** Lead Score */
            lead_score: number;
            lead_source: components["schemas"]["LeadSource"];
            /** Contact Name */
            contact_name: string | null;
            /** Email */
            email: string | null;
            /** Address */
            address: string | null;
            /** Phone */
            phone: string | null;
            /** Customer Id */
            customer_id: number | null;
            /** Customer Name */
            customer_name: string | null;
            /** Tags */
            tags: number[];
        };
        /** LeadOpt */
        LeadOpt: {
            /** Pk */
            pk: number;
            /** Name */
            name: string;
            /** Lead Score */
            lead_score: number;
            /** Customer Name */
            customer_name: string | null;
            lead_status: components["schemas"]["LeadStatus"];
            /** Lead Id */
            lead_id: string;
            customer: components["schemas"]["CustomerMin"] | null;
        };
        /**
         * LeadSource
         * @enum {string}
         */
        LeadSource: "Website" | "Social Media" | "Email Campaign" | "Referral" | "Other";
        /**
         * LeadStatus
         * @enum {string}
         */
        LeadStatus: "New" | "Contacted" | "Qualified" | "Quotation" | "Negotiation" | "Lost" | "Won" | "Discontinued";
        /**
         * LeadScore
         * @enum {string}
         */
        LeadScore: "Likely" | "Very Likely" | "Most Likely";
        /** LeadUpdate */
        LeadUpdate: {
            /** Name */
            name: string;
            /** Lead Score */
            lead_score: number;
            lead_source: components["schemas"]["LeadSource"];
            /** Contact Name */
            contact_name: string | null;
            /** Email */
            email: string | null;
            /** Address */
            address: string | null;
            /** Phone */
            phone: string | null;
            /** Customer Id */
            customer_id: number | null;
            /** Customer Name */
            customer_name: string | null;
            /** Tags */
            tags: number[];
        };
        /** PaginatedCustomer */
        PaginatedCustomer: {
            /** Total Items */
            total_items: number;
            /** Total Page */
            total_page: number;
            /** Page */
            page: number;
            /** Items */
            items: components["schemas"]["Customer"][];
        };
        /** PaginatedCustomerOpt */
        PaginatedCustomerOpt: {
            /** Total Items */
            total_items: number;
            /** Total Page */
            total_page: number;
            /** Page */
            page: number;
            /** Items */
            items: components["schemas"]["CustomerOpt"][];
        };
        /** PaginatedLead */
        PaginatedLead: {
            /** Total Items */
            total_items: number;
            /** Total Page */
            total_page: number;
            /** Page */
            page: number;
            /** Items */
            items: components["schemas"]["Lead"][];
        };
        /** PaginatedLeadOpt */
        PaginatedLeadOpt: {
            /** Total Items */
            total_items: number;
            /** Total Page */
            total_page: number;
            /** Page */
            page: number;
            /** Items */
            items: components["schemas"]["LeadOpt"][];
        };
        /** SetLeadStatus */
        SetLeadStatus: {
            /**
             * Lead Status
             * @enum {string}
             */
            lead_status: "Qualified" | "Contacted" | "Negotiation" | "Lost" | "Discontinued";
        };
        /** TagMin */
        TagMin: {
            /** Pk */
            pk: number;
            /** Name */
            name: string;
        };
        /** UserImageURL */
        UserImageURL: {
            /** Url */
            url: string | null;
        };
        /** UserMin */
        UserMin: {
            /** Pk */
            pk: number;
            /** First Name */
            first_name: string;
            /** Last Name */
            last_name: string;
            /**
             * Email
             * Format: email
             */
            email: string;
            image: components["schemas"]["UserImageURL"];
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    list_customer_customer__get: {
        parameters: {
            query?: {
                page?: number;
                page_size?: number;
                contact___name__icontains?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedCustomer"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_customer_customer__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CustomerCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Customer"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    retrieve_customer_customer__customer_id___get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customer_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Customer"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_customer_customer__customer_id___delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customer_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_customer_option_options_customer__get: {
        parameters: {
            query?: {
                page?: number;
                page_size?: number;
                contact___name__icontains?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedCustomerOpt"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_lead_lead__get: {
        parameters: {
            query?: {
                page?: number;
                page_size?: number;
                name?: string | null;
                customer_id?: number | null;
                lead_source?: components["schemas"]["LeadSource"] | null;
                lead_status?: components["schemas"]["LeadStatus"] | null;
                name__icontains?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedLead"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_lead_lead__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LeadCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Lead"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    retrieve_lead_lead__lead_id___get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                lead_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Lead"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_lead_lead__lead_id___put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                lead_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LeadUpdate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Lead"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_lead_lead__lead_id___delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                lead_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_lead_option_options_lead__get: {
        parameters: {
            query?: {
                page?: number;
                page_size?: number;
                name?: string | null;
                customer_id?: number | null;
                lead_source?: components["schemas"]["LeadSource"] | null;
                lead_status?: components["schemas"]["LeadStatus"] | null;
                name__icontains?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedLeadOpt"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    set_lead_status_lead__lead_id__set_status__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                lead_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetLeadStatus"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Lead"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
