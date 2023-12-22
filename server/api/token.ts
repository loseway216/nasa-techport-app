export default defineEventHandler(async () => {
  return await $fetch(`${process.env.NASA}/generateToken`);
});
