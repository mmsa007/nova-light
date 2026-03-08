import React, { useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Box,
  Button,
  HStack,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Text,
  VStack,
  extendTheme
} from 'native-base';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f4ebff',
      500: '#7a3db8',
      700: '#4d1d80'
    },
    accent: {
      500: '#f2c94c'
    }
  }
});

const TESTS = [
  {
    id: 'stress',
    title: '压力温度计',
    questions: [
      '今天你是否感到精力被过度消耗？',
      '你是否容易因为小事焦虑？',
      '你是否有睡眠质量下降的情况？'
    ]
  },
  {
    id: 'emotion',
    title: '情绪晴雨表',
    questions: ['你今天更偏向乐观？', '你能快速走出负面情绪吗？', '你愿意和他人分享感受吗？']
  },
  {
    id: 'focus',
    title: '专注力测试',
    questions: ['你能连续专注 30 分钟以上吗？', '你是否容易被手机打断？', '你完成计划任务的比例高吗？']
  },
  {
    id: 'social',
    title: '社交能量测试',
    questions: ['你今天愿意主动联系朋友吗？', '你在社交后感到充电吗？', '你能自然表达自己观点吗？']
  },
  {
    id: 'sleep',
    title: '睡眠恢复力',
    questions: ['你昨晚是否在 30 分钟内入睡？', '你中途醒来次数少吗？', '你醒来后有恢复感吗？']
  }
];

const ZODIAC = [
  '白羊座',
  '金牛座',
  '双子座',
  '巨蟹座',
  '狮子座',
  '处女座',
  '天秤座',
  '天蝎座',
  '射手座',
  '摩羯座',
  '水瓶座',
  '双鱼座'
].map((name, index) => ({
  name,
  fortune: `今日关键词：${['行动', '稳定', '沟通', '疗愈', '自信', '整理', '平衡', '洞察', '探索', '规划', '创新', '浪漫'][index]}。适合在下午安排一件提升幸福感的小事，幸运色建议选择金色系。`
}));

const LOTS = [
  { sign: '上上签', text: '紫气东来，贵人相助。今日宜主动出击。' },
  { sign: '上签', text: '稳中有进，先难后易。坚持即可见成果。' },
  { sign: '中签', text: '平常心是福，宜守正不宜冒进。' },
  { sign: '小吉', text: '有小惊喜，适合学习与沟通。' },
  { sign: '末吉', text: '先静后动，今日重在调整节奏。' }
];

function GradientCard({ title, children }) {
  return (
    <Box rounded="2xl" overflow="hidden" mb={4} shadow={3}>
      <LinearGradient colors={['#2f0d5f', '#7a3db8']} start={[0, 0]} end={[1, 1]}>
        <VStack p={4} space={3}>
          <Text color="amber.300" fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Box bg="rgba(255,255,255,0.12)" rounded="xl" p={3}>
            {children}
          </Box>
        </VStack>
      </LinearGradient>
    </Box>
  );
}

function Home({ onNavigate }) {
  const entries = [
    { key: 'test', label: '心理测试' },
    { key: 'zodiac', label: '星座运势' },
    { key: 'fortune', label: '中式算命' }
  ];

  return (
    <GradientCard title="MindLuck · 今日入口">
      <VStack space={3}>
        {entries.map((entry) => (
          <Pressable key={entry.key} onPress={() => onNavigate(entry.key)}>
            <Box bg="rgba(242,201,76,0.2)" p={4} rounded="lg" borderWidth={1} borderColor="amber.300">
              <Text color="white" fontWeight="semibold">
                {entry.label}
              </Text>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </GradientCard>
  );
}

function DailyTest() {
  const [testIndex, setTestIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const test = TESTS[testIndex];
  const q = test.questions[answered];

  const result = useMemo(() => {
    if (answered < test.questions.length) return null;
    if (score >= 7) return '状态优秀：今天适合挑战更高目标。';
    if (score >= 4) return '状态平稳：保持节奏并适当休息。';
    return '状态偏低：建议减压、早睡和适度运动。';
  }, [answered, score, test.questions.length]);

  const answer = (value) => {
    if (answered >= test.questions.length) return;
    setScore((s) => s + value);
    setAnswered((c) => c + 1);
  };

  const reset = (index = testIndex) => {
    setTestIndex(index);
    setScore(0);
    setAnswered(0);
  };

  return (
    <GradientCard title={`每日心理测试 · ${test.title}`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} mb={3}>
        <HStack space={2}>
          {TESTS.map((item, index) => (
            <Button
              key={item.id}
              size="sm"
              variant={index === testIndex ? 'solid' : 'outline'}
              colorScheme="amber"
              onPress={() => reset(index)}
            >
              {item.title}
            </Button>
          ))}
        </HStack>
      </ScrollView>

      {result ? (
        <VStack space={3}>
          <Text color="white">总分：{score} / 9</Text>
          <Text color="amber.200">{result}</Text>
          <Button colorScheme="amber" onPress={() => reset()}>
            再测一次
          </Button>
        </VStack>
      ) : (
        <VStack space={3}>
          <Text color="white">Q{answered + 1}：{q}</Text>
          <Button colorScheme="amber" onPress={() => answer(3)}>
            非常符合
          </Button>
          <Button colorScheme="amber" variant="outline" onPress={() => answer(2)}>
            一般符合
          </Button>
          <Button colorScheme="amber" variant="subtle" onPress={() => answer(1)}>
            不太符合
          </Button>
        </VStack>
      )}
    </GradientCard>
  );
}

function ZodiacFortune() {
  return (
    <GradientCard title="12 星座运势">
      <VStack space={2}>
        {ZODIAC.map((item) => (
          <Box key={item.name} bg="rgba(255,255,255,0.1)" p={3} rounded="lg">
            <Text color="amber.200" bold>
              {item.name}
            </Text>
            <Text color="white" fontSize="xs">
              {item.fortune}
            </Text>
          </Box>
        ))}
      </VStack>
    </GradientCard>
  );
}

function ChineseFortune() {
  const [lot, setLot] = useState(null);

  const draw = () => {
    const daySeed = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    const index = Number(daySeed) % LOTS.length;
    setLot(LOTS[index]);
  };

  return (
    <GradientCard title="中式算命 · 每日抽签">
      <VStack space={3}>
        <Text color="white">每日可抽一签，给自己一点方向感。</Text>
        <Button colorScheme="amber" onPress={draw}>
          抽今日签
        </Button>
        {lot && (
          <Box bg="rgba(242,201,76,0.2)" p={3} rounded="lg" borderColor="amber.300" borderWidth={1}>
            <Text color="amber.100" bold>
              {lot.sign}
            </Text>
            <Text color="white">{lot.text}</Text>
          </Box>
        )}
      </VStack>
    </GradientCard>
  );
}

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <NativeBaseProvider theme={theme}>
      <LinearGradient colors={['#1e083b', '#3f1b73', '#7040ad']} style={{ flex: 1 }}>
        <Box safeArea flex={1} p={4}>
          <Text color="amber.300" fontSize="3xl" bold mb={4}>
            MindLuck
          </Text>

          <ScrollView>
            {page === 'home' && <Home onNavigate={setPage} />}
            {page === 'test' && <DailyTest />}
            {page === 'zodiac' && <ZodiacFortune />}
            {page === 'fortune' && <ChineseFortune />}
          </ScrollView>

          <HStack mt={2} space={2} justifyContent="center">
            <Button size="sm" variant={page === 'home' ? 'solid' : 'ghost'} colorScheme="amber" onPress={() => setPage('home')}>
              首页
            </Button>
            <Button size="sm" variant={page === 'test' ? 'solid' : 'ghost'} colorScheme="amber" onPress={() => setPage('test')}>
              心测
            </Button>
            <Button size="sm" variant={page === 'zodiac' ? 'solid' : 'ghost'} colorScheme="amber" onPress={() => setPage('zodiac')}>
              星座
            </Button>
            <Button size="sm" variant={page === 'fortune' ? 'solid' : 'ghost'} colorScheme="amber" onPress={() => setPage('fortune')}>
              抽签
            </Button>
          </HStack>
        </Box>
      </LinearGradient>
    </NativeBaseProvider>
  );
}
