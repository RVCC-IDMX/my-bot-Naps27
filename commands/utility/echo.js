/* eslint-disable indent */
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input (max length: 25)')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message you want to echo')
        .setRequired(true),
    ),
  async execute(interaction) {
    const messageToEcho = interaction.options.getString('message');

    // Check if the message length exceeds 25 characters
    if (messageToEcho.length > 25) {
      return interaction.reply('The input message must be at most 25 characters long.');
    }

    await interaction.reply(`You said: ${messageToEcho}`);
  },
};