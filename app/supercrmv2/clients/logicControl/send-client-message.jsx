/**
 * Final FILE: send-client-message.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";

/**
 * FILE: send-client-message.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

// ════════════════════════════════════════════════════════════════
// FUNCTION: sendClientMessage
// ════════════════════════════════════════════════════════════════
export function sendClientMessage({profileDataNode = {}, uiOptions = {}} = {})
{

	MosySendSmartMessage({profileDataNode : profileDataNode, uiOptions : uiOptions})

}
