import * as z from "zod";
import { imageSchema } from "./image-schema";

export const SlideType = z.enum(["Intro", "Content", "Outro"]);
export type SlideType = z.infer<typeof SlideType>;

export const TitleSchema = z
  .string()
  .min(10, {
    message: "Title must be at least 10 characters.",
  })
  .max(160, {
    message: "Title must not be longer than 30 characters.",
  });

export const SubtitleSchema = z
  .string()
  // .min(10, {
  //   message: "Subtitle must be at least 10 characters.",
  // })
  .max(160, {
    message: "Subtitle must not be longer than 30 characters.",
  });

export const ContentSlideSchema = z.object({
  type: z.literal(SlideType.enum.Content),
  title: TitleSchema,
  description: z.string(),
  // TODO Fix optional usage of images
  image: z.optional(imageSchema),
});

export const IntroSlideSchema = z.object({
  type: z.literal(SlideType.enum.Intro),
  title: TitleSchema,
  subtitle: SubtitleSchema,
  description: z.string(),
  backgroundImage: z.optional(imageSchema),
});

export const OutroSlideSchema = z.object({
  type: z.literal(SlideType.enum.Outro),
  title: TitleSchema,
  subtitle: SubtitleSchema,
  description: z.string(),
});

export const SlideSchema = z.discriminatedUnion("type", [
  ContentSlideSchema,
  IntroSlideSchema,
  OutroSlideSchema,
]);

export const MultiSlideSchema = z.array(SlideSchema);
