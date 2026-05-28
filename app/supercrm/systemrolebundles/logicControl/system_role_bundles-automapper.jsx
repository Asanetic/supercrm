/**
 * Final FILE: system_role_bundles-automapper.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import SystemRoleBundlesList from '../uiControl/SystemRoleBundlesList';
import { InteprateSystemRoleBundlesEvent } from '../dataControl/SystemRoleBundlesRequestHandler';

// ════════════════════════════════════════════════════════════════
// FUNCTION: viewSystemRoleBundles
// PURPOSE : Open Bundle Details modal
// ════════════════════════════════════════════════════════════════
export function viewSystemRoleBundles({
    childCol,
    parentColVal,
    parentName
}) {

    const invokedUrl = window.location.pathname;

    
    const interval = setInterval(() => {

        ///console.log(`timer running ${parentName}`);

        const modalExists =
            document.getElementById('modal4');

        // modal closed manually
        if (!modalExists) {

            console.log(
                `modal closed ${parentName} modal does not exist`
            );

            clearInterval(interval);

            return;
        }

        // route changed
        if (window.location.pathname !== invokedUrl) {

            console.log(
                `route changed closing modal ${parentName}`
            );

            closeMosyCard('modal4');

            clearInterval(interval);

            return;
        }

    }, 300);
    
    

    MosyCard(

        `${parentName} Bundle Details`,

        <div className="col-md-12 p-0" id="modal4">

            <SystemRoleBundlesList
                dataIn={{
                    showDataControlSections: true,

                    customProfilePath:
                        '../systemrolebundles/profile',

                    customQueryStr: {
                        [childCol]:
                            btoa(parentColVal)
                    }
                }}

                dataOut={{
                    setChildDataOut:
                        InteprateSystemRoleBundlesEvent
                }}
            />

            {/* FOOTER */}
            <div
                className="col-md-12 pt-3 pb-3 pl-2 pr-3 text-right border-top bg-white"
                style={{
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 20
                }}
            >

                <a
                    href={`../systemrolebundles/list?system_role_bundles_mosyfilter=${btoa(`${childCol}='${btoa(parentColVal)}'`)}`}
                    className="app_text_color"
                >
                    View All

                    <i className="fa fa-arrow-right app_text_color ml-2"></i>

                </a>

            </div>

        </div>,

        true,
        'modal4',
        'mosycard_wide'
    );
}
