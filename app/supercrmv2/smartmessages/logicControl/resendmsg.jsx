/**
 * Final FILE: resendmsg.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';

/**
 * FILE: resendmsg.jsx
 * AUTO GENERATED FRONTEND FUNCTION
 */

import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";

// ════════════════════════════════════════════════════════════════
// FUNCTION: reSendMessage
// ════════════════════════════════════════════════════════════════
export function reSendMessage({profileDataNode = {}, uiOptions = {}} = {})
{

	MosySendSmartMessage({profileDataNode : profileDataNode, uiOptions : uiOptions})

}
