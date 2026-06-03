/**
 * Final FILE: send-lead-msg.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";

/**
 * FILE: send-lead-msg.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: sendLeadMessage
// ════════════════════════════════════════════════════════════════
export function sendLeadMessage({profileDataNode = {}, uiOptions = {}} = {})
{

	MosySendSmartMessage({profileDataNode : profileDataNode, uiOptions : uiOptions})

}
