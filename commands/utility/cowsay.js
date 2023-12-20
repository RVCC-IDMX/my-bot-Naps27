/* eslint-disable indent */
const { SlashCommandBuilder } = require('@discordjs/builders');
const cowsay = require('cowsay');

const getCowNames = () => {
  return new Promise((resolve, reject) => {
    cowsay.list((err, names) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(names);
      }
    });
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Make a cow say something')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message for the cow to say')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('cow')
        .setDescription('Choose a cow for the message')
        .setRequired(false)),

  async execute(interaction) {
    const message = interaction.options.getString('message');
    const selectedCow = interaction.options.getString('cow');

    try {
      const cowNames = await getCowNames();

      // Check if the selected cow is valid
      const isValidCow = !selectedCow || cowNames.includes(selectedCow);

      if (!isValidCow) {
        await interaction.reply('Invalid cow name. Please choose a valid cow.');
        return;
      }

      const cowMessage = cowsay.say({ text: message, f: selectedCow });

      // Replace all backticks with a single quote
      const sanitizedMessage = cowMessage.replaceAll('`', '\'');

      // Add escaped backticks to the sanitized message
      const finalMessage = '```' + sanitizedMessage + '```';

      await interaction.reply(finalMessage);
    }
    catch (error) {
      console.error('Error getting cow names:', error);
      await interaction.reply('An error occurred while getting cow names.');
    }
  },

};

