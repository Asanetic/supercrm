
import { mosySqlDelete , base64Decode , mosyQddata , mosyDeleteFile } from '../../../apiUtils/dataControl/dataUtils';
import { processAuthToken } from '../../../auth/authManager';

import { DeleteInvoiceItems } from '../invoiceitems/InvoiceItemsDbGateway';

//role access control 
import { validateRoleAccess } from '../../validateRoleAccess';


export async function GET(request) {

    // --- Validate Token ---
    const { valid: isTokenValid, data: authData, reason: tokenError } = processAuthToken(request);
    if (!isTokenValid) {
      return new Response(
        JSON.stringify({ success: false, message: tokenError }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // -----------------------------
    // SIMPLE ROLE VALIDATION
    // -----------------------------
    const canDelete = validateRoleAccess({
      table: 'invoice_items',
      source: 'InvoiceItems',
      action : 'delete',
      role: 'manage_invoice_items',
      authData
    });

    if (!canDelete.valid) {
      return Response.json({
        status: 'error',
        message: canDelete.message,
        data: []
      });
    }
    
    
  const { searchParams } = new URL(request.url);

  const deleteToken = searchParams.get('_invoice_items_delete_record');
  const deleteTokenDecode = base64Decode(deleteToken);

  if (deleteToken) {
    // Customize table and WHERE clause here
    const table = 'invoice_items'; // Replace with your actual table
    
     
    
    const whereStr = `WHERE primkey = '${deleteTokenDecode}'`;

    const res = await DeleteInvoiceItems(deleteTokenDecode, whereStr);

    if (res.status === 'success') {
      return Response.json({ status: 'success', rowsAffected: res.affectedRows });
    } else {
      return Response.json({ status: 'error', message: res.message }, { status: 500 });
    }
  }

  return Response.json({ status: 'idle', message: 'No action performed' });
  
}