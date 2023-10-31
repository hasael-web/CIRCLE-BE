import amqp from "amqplib";
import Env from "../utils/variables/Env";

const ProducerService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage: async (queue: string, message: any) => {
    const connection = await amqp.connect(Env.AMQP_SERVER);
    const channel = await connection.createChannel();

    // mengecek ketersediaan queue
    await channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(message));

    // tutup koneksi 1 detik setelah pengiriman antrian
    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

export default ProducerService;
