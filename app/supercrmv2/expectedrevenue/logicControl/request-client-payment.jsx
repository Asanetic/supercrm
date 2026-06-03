/**
 * Final FILE: request-client-payment.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosyCreatePayRequest } from "../../UiControl/MosyGeneratePaymentRequest";

/**
 * FILE: request-client-payment.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: generateRequestPayment
// ════════════════════════════════════════════════════════════════
export function generateRequestPayment({requestData, title})
{

	MosyCreatePayRequest({requestData:requestData, title:title})

}
