/* eslint-disable indent */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder } = require('discord.js');
const { ButtonBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Displays a guide with buttons'),

  async execute(interaction) {
    const primaryButton = new ButtonBuilder()
      .setCustomId('primary_button')
      .setLabel('Primary Button')
      .setStyle(1);

    const linkButton = new ButtonBuilder()
      .setStyle(5)
      .setLabel('Visit Repo')
      .setURL('https://github.com/RVCC-IDMX/my-bot-Naps27/tree/main');

    const row = new ActionRowBuilder()
      .addComponents(primaryButton, linkButton);

    await interaction.reply({
      content: 'Here is a guide with buttons:',
      components: [row],
    });
    const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

    collector.on('collect', async (buttonInteraction) => {
      if (buttonInteraction.customId === 'primary_button') {

        const embed = {
          color: 0x0099ff,
          title: 'Button Clicked!',
          description: 'This is the response to the primary button click.',
        };

        await buttonInteraction.update({ embeds: [embed], components: [] });
      }
    });

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} interactions.`);
    });
  },
};