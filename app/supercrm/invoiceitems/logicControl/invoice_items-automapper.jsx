/**
 * Final FILE: invoice_items-automapper.jsx
 * Auto Generated Frontend Functions
 */

import { MosyCard , closeMosyCard} from '../../../components/MosyCard';
import InvoiceItemsList from '../uiControl/InvoiceItemsList';
import { InteprateInvoiceItemsEvent } from '../dataControl/InvoiceItemsRequestHandler';

// ════════════════════════════════════════════════════════════════
// FUNCTION: viewInvoiceItems
// PURPOSE : Open Invoice Items modal
// ════════════════════════════════════════════════════════════════
export function viewInvoiceItems({
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

        `${parentName} Invoice Items`,

        <div className="col-md-12 p-0" id="modal4">

            <InvoiceItemsList
                dataIn={{
                    showDataControlSections: true,

                    customProfilePath:
                        '../invoiceitems/profile',

                    customQueryStr: {
                        [childCol]:
                            btoa(parentColVal)
                    }
                }}

                dataOut={{
                    setChildDataOut:
                        InteprateInvoiceItemsEvent
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
                    href={`../invoiceitems/list?invoice_items_mosyfilter=${btoa(`${childCol}='${btoa(parentColVal)}'`)}`}
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
