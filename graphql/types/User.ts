import { Link } from "./Link";
import { enumType, objectType } from "nexus";
import { resolve } from "path";

export const User = objectType({
    name: "User",
    definition(t) {
        t.string("id");
        t.string("name");
        t.string("email");
        t.string("image");
        t.field("role", { type: Role });
        t.list.field("bookmark", {
            type: Link,
            async resolve(parent, _args, ctx) {
                return await ctx.prisma.user
                    .findUnique({
                        where: {
                            id: parent.id,
                        },
                    })
                    .bookmarks();
            },
        });
    },
});

const Role = enumType({
    name: "Role",
    members: ["USER", "ADMIN"],
});
