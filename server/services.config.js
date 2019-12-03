module.exports = {
    apps: [
        {
            name: 'global-lobby',
            script: 'dist/services/lobby/main.js',
            watch: ["dist/services/lobby", "dist/lib"]
        },
        {
            name: 'global-account',
            script: 'dist/services/account/main.js',
            watch: ["dist/services/account", "dist/lib"]
        },
        {
            name: 'global-presence',
            script: 'dist/services/presence/main.js',
            watch: ["dist/services/presence", "dist/lib"]
        },
        {
            name: 'global-character',
            script: 'dist/services/character/main.js',
            watch: ["dist/services/character", "dist/lib"]
        },
        {
            name: 'global-item',
            script: 'dist/services/item/main.js',
            watch: ["dist/services/item", "dist/lib"]
        },
        {
            name: 'global-quest',
            script: 'dist/services/quest/main.js',
            watch: ["dist/services/quest", "dist/lib"]
        },
        {
            name: 'global-chat',
            script: 'dist/services/chat/main.js',
            watch: ["dist/services/chat", "dist/lib"]
        },
        {
            instances: 2,
            name: (process.env.WORLD_CONSTANT || 'maiden') + '-server',
            script: 'dist/services/world/main.js',
            watch: ["dist/services/world", "dist/lib"],
            env: {
                WORLD_CONSTANT: process.env.WORLD_CONSTANT,
                WORLD_NAME: process.env.WORLD_NAME
            }
        },
        {
            name: (process.env.WORLD_CONSTANT || 'maiden') + '-commerce',
            script: 'dist/services/commerce/main.js',
            watch: ["dist/services/commerce", "dist/lib"],
            env: {
                WORLD_CONSTANT: process.env.WORLD_CONSTANT,
                WORLD_NAME: process.env.WORLD_NAME
            }
        },
        {
            name: (process.env.WORLD_CONSTANT || 'maiden') + '-map-tutorial',
            script: 'dist/services/map/main.js',
            watch: ["dist/services/map", "dist/lib"],
            env: {
                MAP: 'tutorial',
                WORLD_CONSTANT: process.env.WORLD_CONSTANT,
                WORLD_NAME: process.env.WORLD_NAME
            }
        }
    ]
};
