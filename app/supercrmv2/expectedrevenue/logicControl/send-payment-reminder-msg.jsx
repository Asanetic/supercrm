/**
 * Final FILE: send-payment-reminder-msg.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";

/**
 * FILE: send-payment-reminder-msg.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: sendReminderMessage
// ════════════════════════════════════════════════════════════════
export function sendReminderMessage({profileDataNode = {}, uiOptions = {}} = {})
{

	MosySendSmartMessage({profileDataNode : profileDataNode, uiOptions : uiOptions})

}
