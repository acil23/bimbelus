import "dotenv/config";

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!accountName) {
  throw new Error("AZURE_STORAGE_ACCOUNT_NAME is missing");
}

if (!containerName) {
  throw new Error("AZURE_STORAGE_CONTAINER_NAME is missing");
}

const credential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  credential,
);

const containerClient =
  blobServiceClient.getContainerClient(containerName);

async function main() {
  console.log("Testing Azure Blob Storage...");

  await containerClient.getProperties();

  console.log("Container connection successful:");
  console.log({
    accountName,
    containerName,
  });
}

main().catch((error) => {
  console.error("Azure Blob test failed:");
  console.error(error);
  process.exit(1);
});