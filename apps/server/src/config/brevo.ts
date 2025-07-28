import SibApiV3Sdk from "sib-api-v3-sdk";
import { env } from ".";

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = env.BREVO_API_KEY;

const brevo = new SibApiV3Sdk.TransactionalEmailsApi();

export default brevo;
