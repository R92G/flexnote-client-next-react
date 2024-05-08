import { getPlaiceholder } from "plaiceholder";

export async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    //console.log(`base64: ${base64}`)

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
}

export default async function addBlurredDataUrls(images: string[]) {
  // Make all request at once instead of waiting for each one to finish - avoiding the waterfall effect.
  const base64Promises = images.map(async (image) => {
    return await getBase64(image);
  });

  const base64s = await Promise.all(base64Promises);

  const photosWithBlur = images.map((image, index) => {
    return {
      url: image,
      blurDataURL: base64s[index],
    };
  });

  return photosWithBlur;
}
