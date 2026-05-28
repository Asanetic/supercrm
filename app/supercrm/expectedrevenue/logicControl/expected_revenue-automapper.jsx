/**
 * Final FILE: expected_revenue-automapper.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import ExpectedRevenueList from '../uiControl/ExpectedRevenueList';
import { InteprateExpectedRevenueEvent } from '../dataControl/ExpectedRevenueRequestHandler';

// ════════════════════════════════════════════════════════════════
// FUNCTION: viewExpectedRevenue
// PURPOSE : Open Revenue modal
// ════════════════════════════════════════════════════════════════
export function viewExpectedRevenue({
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

        `${parentName} Revenue`,

        <div className="col-md-12 p-0" id="modal4">

            <ExpectedRevenueList
                dataIn={{
                    showDataControlSections: true,

                    customProfilePath:
                        '../expectedrevenue/profile',

                    customQueryStr: {
                        [childCol]:
                            btoa(parentColVal)
                    }
                }}

                dataOut={{
                    setChildDataOut:
                        InteprateExpectedRevenueEvent
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
                    href={`../expectedrevenue/list?expected_revenue_mosyfilter=${btoa(`${childCol}='${btoa(parentColVal)}'`)}`}
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
