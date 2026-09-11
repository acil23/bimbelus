import "server-only";

import {
  BlobServiceClient,
  type BlockBlobClient,
} from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!accountName) {
  throw new Error("AZURE_STORAGE_ACCOUNT_NAME is not configured");
}

if (!containerName) {
  throw new Error("AZURE_STORAGE_CONTAINER_NAME is not configured");
}

const credential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  credential,
);

const containerClient =
  blobServiceClient.getContainerClient(containerName);

export async function uploadPublicImage({
  key,
  buffer,
  contentType,
}: {
  key: string;
  buffer: Buffer;
  contentType: string;
}): Promise<{
  url: string;
  key: string;
}> {
  const blobClient: BlockBlobClient =
    containerClient.getBlockBlobClient(key);

  await blobClient.uploadData(buffer, {
    blobHTTPHeaders: {
      blobContentType: contentType,
      blobCacheControl: "public, max-age=31536000, immutable",
    },
  });

  return {
    url: blobClient.url,
    key,
  };
}