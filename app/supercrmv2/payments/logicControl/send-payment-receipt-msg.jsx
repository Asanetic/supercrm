/**
 * Final FILE: send-payment-receipt-msg.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";

/**
 * FILE: send-payment-receipt-msg.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: sendAckMessage
// ════════════════════════════════════════════════════════════════
export function sendAckMessage({profileDataNode = {}, uiOptions = {}} = {})
{

	MosySendSmartMessage({profileDataNode : profileDataNode, uiOptions : uiOptions})

}
