// Wedding RSVP → Google Sheets
//
// Setup:
// 1. Open your Google Sheet → Extensions → Apps Script → paste this → save
// 2. Deploy → New deployment → Web app
//    Execute as: Me | Who has access: Anyone
// 3. Copy the web app URL and paste it into the editor → RSVP → Form Backend URL → Publish

const SHEET_NAME = 'WEDDING INVITES';
const NOTIFY = ['marton.papai@gmail.com', 'sobutorina@gmail.com'];

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Attending', 'Events', 'Guests', 'Language']);
      sheet.setFrozenRows(1);
    }

    const p = e.parameter;
    const events = (e.parameters.events || []).join(' + ') || '—';
    const ts = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Budapest' });

    sheet.appendRow([ts, p.name, p.email, p.attending, events, p.guests || '1', p._language || 'en']);

    const attending = (p.attending || '').toLowerCase() === 'yes';
    const subject = `[RSVP] ${p.name} — ${attending ? '✓ Attending' : '✗ Not attending'}`;
    const body = `Name: ${p.name}\nEmail: ${p.email}\nAttending: ${p.attending}\nEvents: ${events}\nGuests: ${p.guests || 1}\n\nSubmitted: ${ts}`;
    NOTIFY.forEach(addr => GmailApp.sendEmail(addr, subject, body));

    return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
