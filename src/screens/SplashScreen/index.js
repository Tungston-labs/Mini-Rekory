import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const badgeAnim = useRef(new Animated.Value(0)).current;
  const wordAnim = useRef(new Animated.Value(30)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const loaderAnim = useRef(new Animated.Value(0)).current;
  const ring1Anim = useRef(new Animated.Value(0.6)).current;
  const ring1Opacity = useRef(new Animated.Value(0)).current;
  const ring2Anim = useRef(new Animated.Value(0.6)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse rings loop
    const pulseRing = (scaleRef, opacityRef, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scaleRef, {
              toValue: 1.1,
              duration: 2400,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(opacityRef, {
                toValue: 0.7,
                duration: 700,
                useNativeDriver: true,
              }),
              Animated.timing(opacityRef, {
                toValue: 0,
                duration: 1700,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.parallel([
            Animated.timing(scaleRef, { toValue: 0.6, duration: 0, useNativeDriver: true }),
          ]),
        ])
      ).start();
    };

    pulseRing(ring1Anim, ring1Opacity, 0);
    pulseRing(ring2Anim, ring2Opacity, 300);

    // Disc pop
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      delay: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Badge bounce
    Animated.spring(badgeAnim, {
      toValue: 1,
      friction: 4,
      delay: 800,
      useNativeDriver: true,
    }).start();

    // Wordmark slide up
    Animated.parallel([
      Animated.timing(wordAnim, {
        toValue: 0,
        duration: 600,
        delay: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(wordOpacity, {
        toValue: 1,
        duration: 600,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Loader bar
    Animated.timing(loaderAnim, {
      toValue: 1,
      duration: 2000,
      delay: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // width can't use native driver
    }).start();

    // Navigate after splash
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const loaderWidth = loaderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>

      {/* Rings + Disc */}
      <View style={styles.ringWrapper}>
        {/* Ring 1 */}
        <Animated.View style={[
          styles.ring, styles.ring1,
          { opacity: ring1Opacity, transform: [{ scale: ring1Anim }] }
        ]} />
        {/* Ring 2 */}
        <Animated.View style={[
          styles.ring, styles.ring2,
          { opacity: ring2Opacity, transform: [{ scale: ring2Anim }] }
        ]} />

        {/* Disc */}
        <Animated.View style={[
          styles.disc,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}>
          {/* Person icon */}
          <View style={styles.person}>
            <View style={styles.personHead} />
            <View style={styles.personBody} />
          </View>

          {/* GPS Badge */}
          <Animated.View style={[
            styles.badge,
            {
              opacity: badgeAnim,
              transform: [{ scale: badgeAnim }],
            }
          ]}>
            <View style={styles.badgeDot} />
            <View style={styles.badgeTail} />
          </Animated.View>

          {/* Punch card notch */}
          <Animated.View style={[
            styles.notch,
            { opacity: badgeAnim }
          ]}>
            <View style={styles.notchHole} />
            <View style={styles.notchHole} />
            <View style={styles.notchHole} />
          </Animated.View>
        </Animated.View>
      </View>

      {/* Wordmark */}
      <Animated.View style={[
        styles.wordmark,
        { opacity: wordOpacity, transform: [{ translateY: wordAnim }] }
      ]}>
        <Text style={styles.wmBold}>AT</Text>
        <Text style={styles.wmLight}>tnd</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text style={[
        styles.tagline,
        { opacity: wordOpacity, transform: [{ translateY: wordAnim }] }
      ]}>
        KNOW WHO. KNOW WHERE.
      </Animated.Text>

      {/* Loader bar */}
      <Animated.View style={[styles.loaderWrap, { opacity: wordOpacity }]}>
        <Animated.View style={[styles.loaderBar, { width: loaderWidth }]} />
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AD0D0E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringWrapper: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ring: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  ring1: { width: 200, height: 200 },
  ring2: { width: 160, height: 160 },
  disc: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  person: {
    alignItems: 'center',
    gap: 2,
    marginTop: -6,
  },
  personHead: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#AD0D0E',
  },
  personBody: {
    width: 46,
    height: 24,
    backgroundColor: '#AD0D0E',
    borderRadius: 23,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  badge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#BA7517',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    zIndex: 3,
  },
  badgeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FAEEDA',
  },
  badgeTail: {
    width: 3,
    height: 7,
    backgroundColor: '#FAEEDA',
    borderRadius: 2,
  },
  notch: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 30,
    height: 18,
    backgroundColor: '#FAEEDA',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    zIndex: 3,
  },
  notchHole: {
    width: 3,
    height: 8,
    backgroundColor: '#BA7517',
    borderRadius: 2,
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 28,
  },
  wmBold: {
    fontSize: 56,
    fontWeight: '800',
    color: 'white',
    letterSpacing: -2,
    lineHeight: 60,
  },
  wmLight: {
    fontSize: 56,
    fontWeight: '300',
    color: '#BA7517',
    letterSpacing: 4,
    lineHeight: 60,
  },
  tagline: {
    marginTop: 10,
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 4,
    color: 'rgba(255,255,255,0.6)',
  },
  loaderWrap: {
    marginTop: 40,
    width: 160,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderBar: {
    height: '100%',
    backgroundColor: '#03B30F',
    borderRadius: 2,
  },
});

export default SplashScreen;