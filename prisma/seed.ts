import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create demo users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'rafiq@example.com' },
      update: {},
      create: {
        email: 'rafiq@example.com',
        name: 'Rafiq Ahmed',
        username: 'rafiqahmed',
        password: hashedPassword,
        userType: 'INVESTOR',
        verified: true,
        bio: 'Angel investor focused on early-stage tech startups in Bangladesh',
        location: 'Dhaka, Bangladesh',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah@example.com' },
      update: {},
      create: {
        email: 'sarah@example.com',
        name: 'Sarah Khan',
        username: 'sarahkhan',
        password: hashedPassword,
        userType: 'MENTOR',
        verified: true,
        bio: 'Startup mentor | Ex-Google | Helping entrepreneurs build great products',
        location: 'Chittagong, Bangladesh',
      },
    }),
    prisma.user.upsert({
      where: { email: 'karim@example.com' },
      update: {},
      create: {
        email: 'karim@example.com',
        name: 'Karim Hassan',
        username: 'karimhassan',
        password: hashedPassword,
        userType: 'ENTREPRENEUR',
        verified: true,
        bio: 'Founder @TechBD | Building the future of fintech in Bangladesh',
        location: 'Dhaka, Bangladesh',
      },
    }),
    prisma.user.upsert({
      where: { email: 'nadia@example.com' },
      update: {},
      create: {
        email: 'nadia@example.com',
        name: 'Nadia Rahman',
        username: 'nadiarahman',
        password: hashedPassword,
        userType: 'ENTREPRENEUR',
        verified: false,
        bio: 'EdTech entrepreneur | Making education accessible for all',
        location: 'Sylhet, Bangladesh',
      },
    }),
    // Adding 5 more demo users
    prisma.user.upsert({
      where: { email: 'asif@example.com' },
      update: {},
      create: {
        email: 'asif@example.com',
        name: 'Asif Mollick',
        username: 'asifmollick',
        password: hashedPassword,
        userType: 'ENTREPRENEUR',
        verified: true,
        bio: 'AI & Machine Learning enthusiast | Building smart solutions for Bangladesh',
        location: 'Dhaka, Bangladesh',
      },
    }),
    prisma.user.upsert({
      where: { email: 'fatima@example.com' },
      update: {},
      create: {
        email: 'fatima@example.com',
        name: 'Fatima Begum',
        username: 'fatimabegum',
        password: hashedPassword,
        userType: 'SERVICE_PROVIDER',
        verified: true,
        bio: 'Digital marketing expert | Helping startups grow their online presence',
        location: 'Dhaka, Bangladesh',
      },
    }),
    prisma.user.upsert({
      where: { email: 'hassan@example.com' },
      update: {},
      create: {
        email: 'hassan@example.com',
        name: 'Hassan Ali',
        username: 'hassanali',
        password: hashedPassword,
        userType: 'INVESTOR',
        verified: false,
        bio: 'Venture capitalist | Investing in innovative tech startups across South Asia',
        location: 'Chittagong, Bangladesh',
      },
    }),
    prisma.user.upsert({
      where: { email: 'maya@example.com' },
      update: {},
      create: {
        email: 'maya@example.com',
        name: 'Maya Chowdhury',
        username: 'mayachowdhury',
        password: hashedPassword,
        userType: 'MENTOR',
        verified: true,
        bio: 'Product manager | Ex-Microsoft | Mentoring the next generation of entrepreneurs',
        location: 'Dhaka, Bangladesh',
      },
    }),
    prisma.user.upsert({
      where: { email: 'rafi@example.com' },
      update: {},
      create: {
        email: 'rafi@example.com',
        name: 'Rafi Islam',
        username: 'rafiislam',
        password: hashedPassword,
        userType: 'ENTREPRENEUR',
        verified: false,
        bio: 'HealthTech founder | Revolutionizing healthcare delivery in rural Bangladesh',
        location: 'Rajshahi, Bangladesh',
      },
    }),
  ]);

  // Create demo posts
  const posts = [
    {
      userId: users[2].id, // Karim Hassan
      content: `Excited to announce that TechBD has raised $2M in seed funding! 🚀

This funding will help us expand our fintech platform across Bangladesh and bring financial services to millions of underserved communities.

Huge thanks to our investors and the amazing team that made this possible. The journey is just beginning!

#StartupBangladesh #Fintech #FundingRound`,
    },
    {
      userId: users[1].id, // Sarah Khan
      content: `Just wrapped up an amazing mentorship session with 5 early-stage founders. The energy and innovation in Bangladesh's startup ecosystem is incredible!

Key takeaways for aspiring entrepreneurs:
✅ Focus on solving real problems
✅ Build for your users, not for investors
✅ Network is your net worth
✅ Fail fast, learn faster

Who's building something exciting? Drop your startup in the comments! 👇`,
    },
    {
      userId: users[3].id, // Nadia Rahman
      content: `We're launching our MVP next week! 🎉

EduConnect will help students in rural areas access quality education through our mobile-first platform.

Looking for beta testers - if you're interested in education technology, DM me!

#EdTech #Innovation #Bangladesh`,
    },
    {
      userId: users[0].id, // Rafiq Ahmed
      content: `Looking to invest in 3-4 early-stage startups this quarter. Particularly interested in:

• AI/ML applications
• HealthTech solutions
• Sustainable agriculture tech
• B2B SaaS

If you're raising a pre-seed or seed round, let's connect!

#AngelInvestor #StartupFunding`,
    },
    {
      userId: users[2].id, // Karim Hassan
      content: `Lessons learned from building a startup in Bangladesh:

1. Local market knowledge > Silicon Valley playbooks
2. Mobile-first is not optional, it's mandatory
3. Community building takes time but pays off
4. Regulatory challenges are real - plan accordingly
5. Your team makes or breaks everything

What would you add to this list?`,
    },
    // New posts from the 5 additional users
    {
      userId: users[4].id, // Asif Mollick
      content: `Just deployed our first AI model in production! 🤖

Our machine learning algorithm can predict crop yields with 85% accuracy, helping farmers make better decisions.

The future of agriculture is here, and it's powered by AI. Excited to see how technology can transform traditional industries in Bangladesh.

#AI #MachineLearning #AgTech #Innovation`,
    },
    {
      userId: users[5].id, // Fatima Begum
      content: `Digital marketing tip for startups: 📱

Your social media strategy should be 70% value, 20% engagement, 10% promotion.

Stop selling all the time. Start helping your audience solve problems, and they'll naturally become your customers.

Need help with your digital marketing? Let's connect!

#DigitalMarketing #StartupTips #SocialMedia`,
    },
    {
      userId: users[6].id, // Hassan Ali
      content: `Invested in 3 amazing startups this month! 💰

The quality of founders and ideas coming out of Bangladesh is world-class. We're seeing innovation in fintech, edtech, and healthtech that can compete globally.

To founders: Don't underestimate the power of solving local problems first. Global expansion comes later.

#VentureCapital #StartupInvestment #Bangladesh`,
    },
    {
      userId: users[7].id, // Maya Chowdhury
      content: `Product management lesson from my Microsoft days: 🎯

The best products are built by teams that obsess over user problems, not features.

Before building anything, ask:
- What problem are we solving?
- Who has this problem?
- How do they solve it today?
- Why is our solution better?

#ProductManagement #StartupAdvice #UserExperience`,
    },
    {
      userId: users[8].id, // Rafi Islam
      content: `Healthcare in rural Bangladesh needs a revolution! 🏥

We're building telemedicine solutions that connect patients with doctors through simple mobile apps.

Already helped 500+ patients get medical consultations without traveling to the city.

Technology can truly save lives. Let's make healthcare accessible for everyone!

#HealthTech #Telemedicine #RuralHealth #Innovation`,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  // Create connection requests (user 0, 1, 3 sending requests to user 2 - Karim)
  await prisma.connectionRequest.upsert({
    where: {
      senderId_receiverId: {
        senderId: users[0].id,
        receiverId: users[2].id,
      },
    },
    update: {},
    create: {
      senderId: users[0].id,
      receiverId: users[2].id,
      status: 'PENDING',
    },
  });

  await prisma.connectionRequest.upsert({
    where: {
      senderId_receiverId: {
        senderId: users[1].id,
        receiverId: users[2].id,
      },
    },
    update: {},
    create: {
      senderId: users[1].id,
      receiverId: users[2].id,
      status: 'PENDING',
    },
  });

  await prisma.connectionRequest.upsert({
    where: {
      senderId_receiverId: {
        senderId: users[3].id,
        receiverId: users[2].id,
      },
    },
    update: {},
    create: {
      senderId: users[3].id,
      receiverId: users[2].id,
      status: 'PENDING',
    },
  });

  // Create demo messages
  const messages = [
    {
      senderId: users[2].id, // Karim Hassan
      receiverId: users[1].id, // Sarah Khan
      content: "Hey Sarah! Thanks for the mentorship session yesterday. Your insights on product-market fit were really valuable.",
    },
    {
      senderId: users[1].id, // Sarah Khan
      receiverId: users[2].id, // Karim Hassan
      content: "You're welcome, Karim! I'm glad it was helpful. How's the user testing going for TechBD?",
    },
    {
      senderId: users[2].id, // Karim Hassan
      receiverId: users[1].id, // Sarah Khan
      content: "It's going well! We've got some great feedback and are iterating on the UI. Would love to show you the updates next week.",
    },
    {
      senderId: users[0].id, // Rafiq Ahmed
      receiverId: users[2].id, // Karim Hassan
      content: "Hi Karim, I saw your funding announcement. Congratulations! I'd love to discuss potential investment opportunities for your next round.",
    },
    {
      senderId: users[2].id, // Karim Hassan
      receiverId: users[0].id, // Rafiq Ahmed
      content: "Thank you, Rafiq! We're not raising right now, but I'd be happy to keep you updated on our progress. Let's schedule a call soon.",
    },
    {
      senderId: users[4].id, // Asif Mollick
      receiverId: users[7].id, // Maya Chowdhury
      content: "Hi Maya! I read your post about product management. As someone building an AI product, I'd love to get your thoughts on our roadmap.",
    },
    {
      senderId: users[7].id, // Maya Chowdhury
      receiverId: users[4].id, // Asif Mollick
      content: "Hi Asif! I'd be happy to help. AI products have unique challenges. Let's set up a time to discuss your roadmap and user feedback strategy.",
    },
  ];

  for (const message of messages) {
    await prisma.message.create({
      data: message,
    });
  }

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
