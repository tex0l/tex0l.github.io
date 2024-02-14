import {z, defineCollection} from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        tags: z.array(z.string()).default(() => []),
        image: image().optional(),
        alt: z.string().default('cover picture'),
        date: z.coerce.date().default(() => new Date())
    }),
});


export const collections = {
    'blog': blogCollection
};
