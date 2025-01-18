/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query"
import { createNewConversation, deleteConversation } from "../../../api/conversation"
import { queryClient } from "../../../main";

export const useCreateNewConversation = () => {
    return useMutation({
        mutationKey:["CreateNew-Conversation"],
        mutationFn:createNewConversation,
        onSuccess:()=>{
            queryClient.invalidateQueries<any>("GetConversation-OfUser"); 
        }
    })
}

export const useDeleteConversation = () => {
    return useMutation({
      mutationFn: deleteConversation,
      mutationKey:["delete-conversation"],
      onSuccess: (data) => {
        console.log('Conversation deleted successfully:', data);
        queryClient.invalidateQueries<any>(['delete-conversation']);
      },
      onError: (error) => {
        console.error('Error deleting conversation:', error);
      },
    });
  };