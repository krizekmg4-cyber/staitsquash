import type { ReactNode } from 'react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function Section({ id, title, who, children }: { id: string; title: string; who: string; children: ReactNode }) {
  return (
    <section id={id} data-testid={`help-${id}`} className="mb-5 rounded-2xl border border-border bg-card p-5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">{who}</p>
      <h2 className="mt-1 font-serif text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return <ol className="list-decimal space-y-2 pl-5">{items.map((item, index) => <li key={index}>{item}</li>)}</ol>;
}

export default function HelpPage() {
  return (
    <div className="noise min-h-[100dvh] bg-background px-4 py-8">
      <main className="mx-auto max-w-xl">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">StaitSquash match-day tracker</p>
        <h1 data-testid="help-title" className="mt-1 font-serif text-4xl font-bold">How to use it</h1>
        <p className="mt-3 text-sm text-muted-foreground">It shows who plays next, where, and who is coaching them. Pick the part that is yours.</p>
        <nav aria-label="Help sections" className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
          <a href="#players" className="rounded-xl border border-border bg-card px-3 py-2">Players and parents</a>
          <a href="#coaches" className="rounded-xl border border-border bg-card px-3 py-2">Coaches</a>
          <a href="#admin" className="rounded-xl border border-border bg-card px-3 py-2">Alex (admin)</a>
          <a href="#phone" className="rounded-xl border border-border bg-card px-3 py-2">Put it on your phone</a>
        </nav>

        <div className="mt-6">
          <Section id="players" who="Players and parents" title="Your private link">
            <p>Alex sends you a link made just for your player. There is nothing to sign up for and no password.</p>
            <Steps items={[
              'Open the link on your phone.',
              <>You see the next match: the time, the court, the opponent, and <strong>who is coaching</strong>. A coach marked <strong>Virtual</strong> watches by video call.</>,
              'After the match you see the result, and any voice note or advice from the coach.',
              <>The page updates by itself. Times are the time at the venue, the same as the U.S. Squash draw, with the zone next to it (for example CDT). If your phone is on a different clock, a small line shows the time for you.</>,
            ]} />
            <p><strong>Your match journal.</strong> Under your matches there is a journal. Choose an opponent, then write or dictate a note: what worked, what to try next time. To dictate, tap the microphone on your phone's keyboard. Your notes stay in the app, even after the tournament ends. Next time you play the same person, pick them under <em>Show notes about</em> and your old notes are there. Only you can read your journal, on your own link. Coaches and Alex cannot.</p>
            <p>Keep the link to yourself. Anyone who has it can see your player's schedule. If it gets shared by accident, ask Alex for a new one.</p>
            <p>Lost the link? Ask Alex to send it again.</p>
          </Section>

          <Section id="coaches" who="Coaches" title="Sign in once, then you are set">
            <Steps items={[
              <>Open the app link Alex sent you and choose <strong>Sign up</strong>. Use the Google account you want to keep using, and finish the email check.</>,
              'Tell Alex which email you used. He approves it from his Settings screen. You cannot see the matches until he does.',
              <>Once approved, open the link again and sign in. You see every match for the week. Tap <strong>My matches</strong> to see only yours.</>,
              <>Everything on the board is in <strong>Eastern Time</strong>. For a match at a venue in another zone, a small line under it shows the venue's own time, for example <em>Venue 10:40 CDT</em>, so you can check it against the draw.</>,
              'After a match is complete you can save a short written report or a voice note for the player.',
            ]} />
            <p>Coaches cannot change the schedule, the results, or the settings. That is on purpose, so nothing moves by accident.</p>
            <p>If you see "not approved yet," your sign-up worked and Alex has not approved your email yet.</p>
          </Section>

          <Section id="admin" who="Alex and other admins" title="Running the app">
            <p>You do everything from <strong>Settings</strong> (the Settings button at the top of the main screen).</p>
            <Steps items={[
              <><strong>Set up a weekend.</strong> Under <em>This week</em>, add a tournament by its Club Locker link, number, or name and city. Choose your kids from the draw. Set the coach for each match and mark <em>Virtual</em> or <em>Not coaching</em> where it applies.</>,
              <><strong>Add a coach.</strong> Ask the coach to open the app link and sign up. Then enter their email under <em>Coach access</em> and press Approve. Remove them with the X at any time.</>,
              <><strong>Add another admin.</strong> Same steps, under <em>Admins</em>. An admin can do everything you can, so add only people you trust. You cannot remove yourself.</>,
              <><strong>Send a player their link.</strong> Under <em>Kids on the board</em>, copy that player's link and text it to the family.</>,
              <><strong>After the weekend.</strong> Open the <em>Summary</em> tab. A tournament appears there with numbers the morning after its last day, so nothing is counted before it is over. It shows matches coached and matches coached virtually, by coach and by player, and under each coach every match they coached that was played, with the time, player and opponent. Press <em>Copy as text</em> to paste it into an email. Finished tournaments stay in the Summary as <em>Past tournaments</em>, newest first, and are kept permanently even if you later remove a player or start a new tournament. Tap a tournament to open it, or download it as a spreadsheet. Under <em>Report for any dates</em> you can pick any two dates, for example a quarter or a year, to total coaching across every tournament in between and download that as a spreadsheet for accounting.</>,
              <><strong>If a match time looks wrong.</strong> The app works out a tournament's time zone from the venue's location. Check the time against the Club Locker draw. If it is off, correct the zone for that tournament under <em>This week</em>. Times you type when editing a match are Eastern.</>,
            ]} />
            <p>The board refreshes from Club Locker every few minutes. Use <strong>Refresh draw</strong> for an immediate update. If the board says the data is stale, check your connection, then use <strong>Copy problem details</strong> and send it to Rob.</p>
          </Section>

          <Section id="phone" who="Everyone" title="Put it on your phone">
            <p>There is no app store download. You add the page to your home screen, and it opens like an app with its own icon.</p>
            <p><strong>iPhone (use Safari):</strong> open your link, tap the Share button, then <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</p>
            <p><strong>Android (use Chrome):</strong> open your link, tap the three dots, then <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
            <p>Players: add your own private link. Coaches and Alex: add the main app link. Each icon opens the same page you were on.</p>
          </Section>
        </div>
        <p className="mb-8 text-center text-xs text-muted-foreground"><a className="font-bold underline" href={`${basePath}/`}>Back to the app</a></p>
      </main>
    </div>
  );
}
