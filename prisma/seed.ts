import { OrderStatus, PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 新增使用者
  const userData = [
    {
      email: 'admin@example.com',
      password: await hash('password', 10),
      name: '管理員',
      role: Role.ADMIN,
    },
    {
      email: 'user@example.com',
      password: await hash('password', 10),
      name: '使用者',
      role: Role.USER,
    },
  ];

  const createdUsers = await prisma.user.createMany({ data: userData });
  const users = await prisma.user.findMany();
  console.log(`已創建 ${createdUsers.count} 位使用者`);

  // 新增產品類別
  const categoryData = [
    { name: '男性服飾' },
    { name: '女性服飾' },
    { name: '珠寶飾品' },
  ];

  const createdCategories = await prisma.category.createMany({
    data: categoryData,
  });
  const categories = await prisma.category.findMany();
  console.log(`已創建 ${createdCategories.count} 個產品類別`);

  // 新增產品
  const productData = [
    {
      name: '男士休閒高級修身T恤',
      description:
        '這款男士修身T恤以高品質面料製成，輕盈透氣，適合日常穿著和休閒場合。經典的設計和柔軟的質感，為你提供全天的舒適穿著體驗。',
      categoryId: categories.find((c) => c.name === '男性服飾')!.id,
      price: 660,
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: { rate: 4, count: 300 },
    },
    {
      name: '男士棉質夾克',
      description:
        '這款男士棉質夾克是您春秋季節的理想選擇。設計經典且耐穿，適合各種戶外活動，無論是徒步旅行還是日常穿著，均能展現出色的風格和舒適感。',
      categoryId: categories.find((c) => c.name === '男性服飾')!.id,
      price: 1680,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      rating: { rate: 5, count: 250 },
    },
    {
      name: '男士休閒修身款',
      description:
        '這款男士休閒修身款式的外套融合了時尚與功能性，輕鬆搭配多種服飾，適合任何場合。簡約設計讓你無論在工作還是休閒場合，都能保持優雅形象。',
      categoryId: categories.find((c) => c.name === '男性服飾')!.id,
      price: 480,
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      rating: { rate: 4.5, count: 300 },
    },
  ];

  const createdProducts = await prisma.product.createMany({
    data: productData,
  });
  const products = await prisma.product.findMany();
  console.log(`已創建 ${createdProducts.count} 個產品`);

  // 新增購物車
  const cartData = [
    {
      userId: users[0].id,
    },
  ];
  const createdCarts = await prisma.cart.createMany({ data: cartData });
  const carts = await prisma.cart.findMany();
  console.log(`已創建 ${createdCarts.count} 個購物車`);

  // 新增購物車中的產品
  const cartProductData = [
    {
      cartId: carts[0].id,
      productId: products[0].id,
      quantity: 1,
    },
    {
      cartId: carts[0].id,
      productId: products[1].id,
      quantity: 2,
    },
  ];
  const createdCartProducts = await prisma.cartProduct.createMany({
    data: cartProductData,
  });
  console.log(`已創建 ${createdCartProducts.count} 個購物車中的產品`);

  // 新增訂單
  const { categoryId: product1CategoryId, ...product1 } = products[0];
  const { categoryId: product2CategoryId, ...product2 } = products[1];
  const orderData = [
    {
      userId: users[0].id,
      products: [
        {
          ...product1,
          category: categories.find((c) => c.id === product1CategoryId)!,
          quantity: 1,
        },
      ],
      shipping: 50,
      status: OrderStatus.PENDING,
    },
    {
      userId: users[0].id,
      products: [
        {
          ...product2,
          category: categories.find((c) => c.id === product2CategoryId)!,
          quantity: 2,
        },
      ],
      shipping: 50,
      status: OrderStatus.CONFIRMED,
    },
  ];
  const createdOrders = await prisma.order.createMany({ data: orderData });
  console.log(`已創建 ${createdOrders.count} 個訂單`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
