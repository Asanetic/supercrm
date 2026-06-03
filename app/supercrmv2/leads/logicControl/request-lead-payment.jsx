/**
 * Final FILE: request-lead-payment.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosyCreatePayRequest } from "../../UiControl/MosyGeneratePaymentRequest";

/**
 * FILE: request-lead-payment.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: requestLeadPayment
// ════════════════════════════════════════════════════════════════
export function requestLeadPayment({requestData, title})
{

	MosyCreatePayRequest({requestData:requestData, title:title})

}
