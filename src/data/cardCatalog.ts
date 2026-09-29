import type { CatalogCard } from '@/types'

/** Reference catalog of Flesh and Blood cards used for search / autocomplete. */
export const CARD_CATALOG: CatalogCard[] = [
  // Welcome to Rathe
  { name: 'Dorinthea Ironsong', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Legendary' },
  { name: 'Rhinar, Reckless Rampage', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Legendary' },
  { name: 'Katsu, the Wanderer', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Legendary' },
  { name: 'Ira, Crimson Haze', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Legendary' },
  { name: "Fyendal's Spring Tunic", set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Legendary' },
  { name: 'Dawnblade', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Legendary' },
  { name: 'Snapdragon Scalers', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Majestic' },
  { name: 'Enlightened Strike', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Majestic' },
  { name: 'Pummel', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Majestic' },
  { name: 'Tome of Fyendal', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Majestic' },
  { name: "Warmonger's Diplomacy", set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Majestic' },
  { name: 'Scar for a Scar', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Rare' },
  { name: 'Brutal Assault', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Rare' },
  { name: 'Head Jab', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Common' },
  { name: 'Razor Reflex', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Common' },
  { name: 'Whelming Gustwave', set: 'Welcome to Rathe', setCode: 'WTR', rarity: 'Common' },

  // Arcane Rising
  { name: 'Viserai, Rune Blood', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Legendary' },
  { name: 'Azalea, Ace in the Hole', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Legendary' },
  { name: 'Kano, Dracai of Aether', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Legendary' },
  { name: 'Ser Boltyn Bladebolt', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Legendary' },
  { name: 'Timesnap Potion', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Majestic' },
  { name: 'Aether Spindle', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Majestic' },
  { name: 'Sonic Boom', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Majestic' },
  { name: 'Burning Desire', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Rare' },
  { name: 'Rune Flash', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Rare' },
  { name: 'Runic Reclamation', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Common' },
  { name: 'Voltic Bolt', set: 'Arcane Rising', setCode: 'ARC', rarity: 'Common' },

  // Crucible of War
  { name: 'Dash, Inventor Extraordinaire', set: 'Crucible of War', setCode: 'CRU', rarity: 'Legendary' },
  { name: 'Teklo Plasma Pistol', set: 'Crucible of War', setCode: 'CRU', rarity: 'Legendary' },
  { name: 'Command and Conquer', set: 'Crucible of War', setCode: 'CRU', rarity: 'Majestic' },
  { name: 'Induction Chamber', set: 'Crucible of War', setCode: 'CRU', rarity: 'Majestic' },
  { name: 'Teklo Core', set: 'Crucible of War', setCode: 'CRU', rarity: 'Majestic' },
  { name: 'Combustion', set: 'Crucible of War', setCode: 'CRU', rarity: 'Rare' },
  { name: 'Plasma Purifier', set: 'Crucible of War', setCode: 'CRU', rarity: 'Rare' },
  { name: 'Boost (1)', set: 'Crucible of War', setCode: 'CRU', rarity: 'Common' },

  // Monarch
  { name: 'Levia, Shadowborn Abomination', set: 'Monarch', setCode: 'MON', rarity: 'Legendary' },
  { name: 'Prism, Sculptor of Arc Light', set: 'Monarch', setCode: 'MON', rarity: 'Majestic' },
  { name: 'Boltyn, Breaker of Dawn', set: 'Monarch', setCode: 'MON', rarity: 'Legendary' },
  { name: 'Chane, Bound by Shadow', set: 'Monarch', setCode: 'MON', rarity: 'Legendary' },
  { name: 'Skullcrown', set: 'Monarch', setCode: 'MON', rarity: 'Legendary' },
  { name: 'Erase Face', set: 'Monarch', setCode: 'MON', rarity: 'Majestic' },
  { name: 'Spellblade Assault', set: 'Monarch', setCode: 'MON', rarity: 'Majestic' },
  { name: 'Sink Below', set: 'Monarch', setCode: 'MON', rarity: 'Rare' },
  { name: 'Void Wraith', set: 'Monarch', setCode: 'MON', rarity: 'Rare' },
  { name: 'Bloodrot Pox', set: 'Monarch', setCode: 'MON', rarity: 'Common' },
  { name: 'Herald of Protection', set: 'Monarch', setCode: 'MON', rarity: 'Token' },

  // Tales of Aria
  { name: 'Oldhim, Grandfather of Eternity', set: 'Tales of Aria', setCode: 'TOA', rarity: 'Legendary' },
  { name: 'Briar, Warden of Thorns', set: 'Tales of Aria', setCode: 'TOA', rarity: 'Legendary' },
  { name: "Isyn, Winter's Wrath", set: 'Tales of Aria', setCode: 'TOA', rarity: 'Legendary' },
  { name: 'Blizzard', set: 'Tales of Aria', setCode: 'TOA', rarity: 'Majestic' },
  { name: 'Entangle', set: 'Tales of Aria', setCode: 'TOA', rarity: 'Majestic' },
  { name: "Winter's Wail", set: 'Tales of Aria', setCode: 'TOA', rarity: 'Rare' },
  { name: 'Channel Lake Frigid', set: 'Tales of Aria', setCode: 'TOA', rarity: 'Common' },

  // Everfest
  { name: 'Iyslander, Stormbind', set: 'Everfest', setCode: 'EVR', rarity: 'Legendary' },
  { name: "Fyendal's Fighting Spirit", set: 'Everfest', setCode: 'EVR', rarity: 'Majestic' },
  { name: 'Glacial Footsteps', set: 'Everfest', setCode: 'EVR', rarity: 'Rare' },
  { name: 'Polar Blast', set: 'Everfest', setCode: 'EVR', rarity: 'Common' },

  // Dynasty
  { name: 'Fai, Rising Rebellion', set: 'Dynasty', setCode: 'DYN', rarity: 'Legendary' },
  { name: 'Dromai, Ash Artist', set: 'Dynasty', setCode: 'DYN', rarity: 'Legendary' },
  { name: 'Emperor, Dracai of Aesir', set: 'Dynasty', setCode: 'DYN', rarity: 'Legendary' },
  { name: 'Invoke Domina', set: 'Dynasty', setCode: 'DYN', rarity: 'Majestic' },
  { name: 'Invoke Suraya', set: 'Dynasty', setCode: 'DYN', rarity: 'Majestic' },
  { name: 'Embermaw Cenipai', set: 'Dynasty', setCode: 'DYN', rarity: 'Rare' },
  { name: 'Rising Resentment', set: 'Dynasty', setCode: 'DYN', rarity: 'Common' },
  { name: 'Phoenix Flame', set: 'Dynasty', setCode: 'DYN', rarity: 'Token' },
  { name: 'Ash Token', set: 'Dynasty', setCode: 'DYN', rarity: 'Token' },

  // Outsiders
  { name: 'Arakni, Venomous Assassin', set: 'Outsiders', setCode: 'OUT', rarity: 'Legendary' },
  { name: 'Victor Goldmane', set: 'Outsiders', setCode: 'OUT', rarity: 'Legendary' },
  { name: 'Draconic Oath', set: 'Outsiders', setCode: 'OUT', rarity: 'Majestic' },
  { name: 'Prey on the Weak', set: 'Outsiders', setCode: 'OUT', rarity: 'Majestic' },
  { name: 'Gustwave', set: 'Outsiders', setCode: 'OUT', rarity: 'Rare' },
  { name: 'Ponder', set: 'Outsiders', setCode: 'OUT', rarity: 'Common' },
  { name: 'Sand Soldier', set: 'Outsiders', setCode: 'OUT', rarity: 'Token' },

  // Bright Lights
  { name: 'Teklovossen, the Machine Oracle', set: 'Bright Lights', setCode: 'BLG', rarity: 'Legendary' },
  { name: 'Blasmophet, the Soul Harvester', set: 'Bright Lights', setCode: 'BLG', rarity: 'Legendary' },
  { name: 'Shock Chained', set: 'Bright Lights', setCode: 'BLG', rarity: 'Majestic' },
  { name: 'Pulse of Volthaven', set: 'Bright Lights', setCode: 'BLG', rarity: 'Rare' },
  { name: 'Spark of Genius', set: 'Bright Lights', setCode: 'BLG', rarity: 'Common' },
  { name: 'Cogwork Friend', set: 'Bright Lights', setCode: 'BLG', rarity: 'Token' },

  // Dusk Till Dawn
  { name: 'Vynnset, Iron Maiden', set: 'Dusk Till Dawn', setCode: 'DTD', rarity: 'Legendary' },
  { name: 'Florian, Rotwood Harbinger', set: 'Dusk Till Dawn', setCode: 'DTD', rarity: 'Legendary' },
  { name: 'Blood Tribute', set: 'Dusk Till Dawn', setCode: 'DTD', rarity: 'Majestic' },
  { name: 'Unhallowed Rites', set: 'Dusk Till Dawn', setCode: 'DTD', rarity: 'Rare' },
  { name: 'Rotgut', set: 'Dusk Till Dawn', setCode: 'DTD', rarity: 'Common' },

  // Part the Mistveil
  { name: 'Yoji, Wandering Warrior', set: 'Part the Mistveil', setCode: 'MST', rarity: 'Legendary' },
  { name: 'Aiko, Blade of Darkness', set: 'Part the Mistveil', setCode: 'MST', rarity: 'Legendary' },
  { name: 'Spreading Plague', set: 'Part the Mistveil', setCode: 'MST', rarity: 'Majestic' },
  { name: 'Sprit of Eivor', set: 'Part the Mistveil', setCode: 'MST', rarity: 'Rare' },
  { name: 'Mist Step', set: 'Part the Mistveil', setCode: 'MST', rarity: 'Common' },

  // Heavy Hitters
  { name: 'Verdance, Thorn of the Rose', set: 'Heavy Hitters', setCode: 'HVY', rarity: 'Legendary' },
  { name: 'Kassai, Cintari Sellsword', set: 'Heavy Hitters', setCode: 'HVY', rarity: 'Legendary' },
  { name: 'Grandeur of Valahai', set: 'Heavy Hitters', setCode: 'HVY', rarity: 'Legendary' },
  { name: 'Arakni, Solitary Confinement', set: 'Heavy Hitters', setCode: 'HVY', rarity: 'Majestic' },
  { name: 'Kneel before Dracai', set: 'Heavy Hitters', setCode: 'HVY', rarity: 'Majestic' },
  { name: 'Apex of Mortailty', set: 'Heavy Hitters', setCode: 'HVY', rarity: 'Rare' },
  { name: 'Right Jab', set: 'Heavy Hitters', setCode: 'HVY', rarity: 'Common' },

  // Generic basics
  { name: 'Seismic Surge', set: 'Classic Constructed', setCode: 'CLS', rarity: 'Basic' },
  { name: 'Tectonic Plating', set: 'Classic Constructed', setCode: 'CLS', rarity: 'Basic' },
  { name: 'Courage of Bladehold', set: 'Classic Constructed', setCode: 'CLS', rarity: 'Basic' },
]

/** All set names in the catalog, alphabetically sorted. */
export const CATALOG_SETS = Array.from(new Set(CARD_CATALOG.map((c) => c.set))).sort()
