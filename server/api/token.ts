export default defineEventHandler(async () => {
  return await $fetch(`https://techport.nasa.gov/generateToken`);
});
