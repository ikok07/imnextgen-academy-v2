"use server"

import {createServerAction, ServerActionError} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {ModuleInsert} from "@/drizzle/schema/modules";
import {SectionInsert} from "@/drizzle/schema/sections";

export const updateModule = createServerAction(async (moduleId: string | undefined, image: {new: Uint8Array, fileName: string, fileType: string, oldURI: string | undefined} | undefined, data: Partial<ModuleInsert>) => {
   let newImageUrl: string | undefined;
   if (image) {
      if (image.new.length > 300_000) throw new ServerActionError({id: "image-size", message: "Снимката не трябва да надвишава 300kb!"});

      newImageUrl = await getInjection("IUploadSmallFileController")({
         bucket: process.env.NEXT_PUBLIC_R2_MODULES_IMAGES_BUCKET,
         key: `${Math.floor(Date.now() / 1000)}-${image.fileName}`,
         body: Buffer.from(image.new),
         contentType: image.fileType
      });

      if (image.oldURI) {
         await getInjection("IDeleteFileController")({
            bucket: process.env.NEXT_PUBLIC_R2_MODULES_IMAGES_BUCKET,
            key: new URLSearchParams(image.oldURI).get("path") ?? undefined
         });
      }
   }

   return getInjection("IUpdateModuleController")(moduleId, {...data, image_url: newImageUrl});
});

export const createSection = createServerAction(async (data: Partial<Omit<SectionInsert, "order_number">>) => {
   const allSections = (await getInjection("IGetSectionsForModuleController")(data.module_id)).sort((a, b) => a.order_number - b.order_number);
   return getInjection("ICreateSectionController")({...data, order_number: allSections.length > 0 ? allSections[allSections.length - 1].order_number + 1 : 0});
});

export const deleteMultipleSections = createServerAction((moduleId: string, sectionIds: string[]) => {
   return getInjection("IDeleteMultipleSectionsController")(moduleId, sectionIds);
})