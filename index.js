const Discord = require("discord.js");

const client = new Discord.Client();

const auth = require("./auth.json");

let guild = null;

const greetedMembers = new Discord.Collection();

client.on("ready", async () => {
  guild = client.guilds.cache.first();
  if (!guild) throw new Error("Hier läuft was ganz schief!!1!");

  console.log("Logged in.");
});

client.on("message", async (message) => {
  const { author, content } = message;
  const correspondingGuildMember = guild.members.cache.find(
    (member) => member.id === author.id
  );

  if (content === "Ping" && !memberHasGuestRole(correspondingGuildMember)) {
    message.channel.send("Pong");
  }

  // the member has ONLY the role 'Gast'
  if (
    correspondingGuildMember.nickname === "Gast" &&
    correspondingGuildMember._roles.length === 1 &&
    guild.roles.cache.find((role) => role.name === "Gast").id ===
      correspondingGuildMember._roles[0]
  ) {
    if (!content) author.send("Du musst schon was eingeben");

    await correspondingGuildMember.setNickname(content);
    await correspondingGuildMember.send(
      `Alles klar, dein neuer Nickname lautet ${content}`
    );
    await correspondingGuildMember.send(
      `             
HMMMMM :tophat:  nicht Sytherin? 
In welchen Fachbereich möchtest du?
Für Fachbereich Ingeneurswissenschaften schreibe 'FBI'
Für Fachbereich Wirtschaft 'FBW'
Für Fachbereich Management, Information und Technologie schreibe MIT
Für Fachbereich Architektur schreibe 'FBA'
Für Fachbereich Bauwesen, Geoinformation Gesundheitstechnologie schreibe 'FBGG'
Ohne Fachbereich schreibe 'muggel'`
    );
  } else if (
    correspondingGuildMember.nickname !== "Gast" &&
    correspondingGuildMember._roles.length === 1 &&
    guild.roles.cache.find((role) => role.name === "Gast").id ===
      correspondingGuildMember._roles[0]
  ) {
    switch (content) {
      case "FBI":
        correspondingGuildMember.roles.remove(
          guild.roles.cache.find((role) => role.name === "Gast")
        );

        const fbiRole = guild.roles.cache.find((role) => role.name === "FBI");
        correspondingGuildMember.roles.add(fbiRole);

        await author.send(
          "Alles klar, du gehörst nun zum Fachbereich Ingeneurswissenschaften (FBI). Viel Spaß!"
        );
        return;

      case "MIT":
        correspondingGuildMember.roles.remove(
          guild.roles.cache.find((role) => role.name === "Gast")
        );

        const mitRole = guild.roles.cache.find((role) => role.name === "MIT");
        correspondingGuildMember.roles.add(mitRole);

        await author.send(
          "Alles klar, du gehörst nun zum Fachbereich Management, Information und Technologie (MIT). Viel Spaß!"
        );
        return;

      case "FBW":
        correspondingGuildMember.roles.remove(
          guild.roles.cache.find((role) => role.name === "Gast")
        );

        const fbwRole = guild.roles.cache.find((role) => role.name === "FBW");
        correspondingGuildMember.roles.add(fbwRole);

        await author.send(
          "Alles klar, du gehörst nun zum Fachbereich Wirtschaft (FBW). Viel Spaß!"
        );
        return;

      case "FBA":
        correspondingGuildMember.roles.remove(
          guild.roles.cache.find((role) => role.name === "Gast")
        );

        const fbaRole = guild.roles.cache.find((role) => role.name === "FBA");
        correspondingGuildMember.roles.add(fbaRole);

        await author.send(
          "Alles klar, du gehörst nun zum Fachbereich Architektur (FBA). Viel Spaß!"
        );
        return;

      case "FBGG":
        correspondingGuildMember.roles.remove(
          guild.roles.cache.find((role) => role.name === "Gast")
        );

        const fbggRole = guild.roles.cache.find((role) => role.name === "FBGG");
        correspondingGuildMember.roles.add(fbggRole);

        await author.send(
          "Alles klar, du gehörst nun zum Fachbereich Bauwesen, Geoinformation Gesundheitstechnologie (FBGG). Viel Spaß!"
        );
        return;

      case "muggel":
        await author.send("Alles klar, du bist nun 1 Muggel. Viel Spaß!");
        return;
    }

    author.send("Ungültige Eingabe");
  } else {
    //await correspondingGuildMember.send('Schreib den Admin an, du Schlecht');
  }
});

client.on("guildMemberAdd", async (member) => {
  console.log("A new member jost joined the guild!");


  console.log("Changing new member's nickname to 'Gast'");
  await member.setNickname("Gast");

  console.log("Setting new member's role to 'Gast'");
  const guestRole = guild.roles.cache.find((role) => role.name === "Gast");
  await member.roles.add(guestRole);

  console.log("Sending welcome message to new member");
  // Send messasge
  await member.send(
    `Hallo, 
ich bin der Sprechende Hut und werde dich in eines der Häuser einordnen. 
Bitte Sage mir jedoch zunächst deinen Namen, damit ich dir einen Server-Nickname geben kann!
    `
  );
});

const memberHasGuestRole = (memberObj) => {
  return (
    memberObj._roles.length === 1 &&
    guild.roles.cache.find((role) => role.name === "Gast").id ===
      memberObj._roles[0]
  );
};

client.login(auth.token);
