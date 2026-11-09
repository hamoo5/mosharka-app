export async function onRequest(context) {
  // بنقرأ المتغير السري اللي خزنيناه في كلاودفلير
  const dbUrl = context.env.DATABASE_URL;

  // بنرد على المتصفح برسالة نجاح
  return new Response(JSON.stringify({
    message: "أهلاً بك! السيرفر شغال تمام.",
    database_connected: dbUrl ? "نعم، المفتاح متوفر" : "لا، المفتاح مفقود"
  }), {
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });
}
