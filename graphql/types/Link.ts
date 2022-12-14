import { User } from "./User"
import { objectType } from "nexus";

export const Link = objectType({
    name: "Link",
    definition(t) {
        t.string("id");
        t.string("title");
        t.string("url");
        t.string("description");
        t.string("imageUrl");
        t.string("category");
        t.list.field("users", {
            type: User,
            async resolve(parent, _args, ctx) {
                return await ctx.prisma.link
                    .findUnique({
                        where: {
                            id: parent.id,
                        },
                    })
                    .users();
            },
        });
    },
});
