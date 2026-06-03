/**
 * Final FILE: request-payment.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';

/**
 * FILE: request-payment.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

import { MosyCreatePayRequest } from "../../UiControl/MosyGeneratePaymentRequest";

// ════════════════════════════════════════════════════════════════
// FUNCTION: requestPaymentFromLead
// ════════════════════════════════════════════════════════════════
export function requestPaymentFromLead({requestData, title})
{

	MosyCreatePayRequest({requestData:requestData, title:title})

}
