"use server"

import { components } from "@/libs/api/schema/sales";
import { salesClient } from "@/libs/api/services/sales";

export const getAllOrders = async ({
  page,
  page_size = 10,
  status,
  orderId,
  delivery_terms
}: {
  page: number;
  page_size?: number;
  status?: components['schemas']['Order']['status'];
  orderId?: string;
  delivery_terms?: components['schemas']['Order']['delivery_term'];
}) => { 
  try {
    const { response, data } = await salesClient.GET("/order/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          status: status,
          delivery_term: delivery_terms,
          order_id__icontains: orderId
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Orders fetched successfully",
        data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to fetch orders");
  } catch (error){
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch orders";
    
    return {
      status: "error",
      message
    };
  }
}

export const getOrder = async ({ pk }: { pk: number }) => {
  try {
    const { response, data } = await salesClient.GET('/order/{order_id}/', {
      params: {
        path: {
          order_id: pk
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Order fetched successfully",
        data
      };
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to fetch order");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch order";
    
    return {
      status: "error",
      message
    };
  }
}

export const getOrderOptions = async ({ orderID }: { orderID: string }) => {
  try {
    const { response, data } = await salesClient.GET("/options/order/", {
      params: {
        query: {
          order_id__icontains: orderID
        }
      }
    })

    if(response.ok) {
      return {
        status: "success",
        message: "Order options fetched successfully",
        data
      }
    }
    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to fetch order options");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch order options";
    
    return {
      status: "error",
      message
    }
  }
};