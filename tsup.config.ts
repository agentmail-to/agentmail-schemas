import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts', 'src/attachment.ts', 'src/message.ts', 'src/thread.ts', 'src/domain.ts', 'src/events.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
})
