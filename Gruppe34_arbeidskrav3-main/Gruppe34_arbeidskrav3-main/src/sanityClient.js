//Importerer createClient-funksjonen fra @sanity/client-pakken
import { createClient } from "@sanity/client";

//Oppretter og eksporterer en Sanity-klient
export const client = createClient({
  projectId: "j6hvvg4b",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});
