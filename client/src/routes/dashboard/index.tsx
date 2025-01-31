import { chat } from "./chat";
import { comment } from "./comment";
import { HomePage } from "./home";
import { notification } from "./notification";
import { profile } from "./profile";
import { EditPostRoute } from "./update-post";

export const dashboard = [
    ...profile,
    ...notification,
    ...HomePage,
    ...comment,
    ...chat,
    ...EditPostRoute
]