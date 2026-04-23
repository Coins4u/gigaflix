"use client";

import Image from "next/image";
import { Accordion, Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import { paymentsImageSrc, sportsFootballImageSrc } from "@/lib/site-images";
import Icon from "./Icon";
import GlobalClientsSectionLazy from "./GlobalClientsSectionLazy";
import SportsMarqueeSection, { type SportsMarqueeItem } from "./SportsMarqueeSection";

const POSTER_SIZES =
  "(max-width: 700px) 50vw, (max-width: 1200px) 25vw, 240px";
const PAYMENT_SIZES = "(max-width: 768px) 70vw, 320px";
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6Xc9E0AAAAASUVORK5CYII=";

export default function HomeContentClient() {
  return (
    <>
        <section id="sports" className="sports-section">
          <div className="container">
            <div className="sports-header" data-scroll="fade">
              <h2 className="section-title">
                Sports Streaming | Live TV with GiGa FliX
              </h2>
              <p
                style={{
                  textAlign: "center",
                  maxWidth: 800,
                  margin: "0 auto 40px",
                  color: "var(--text-gray)",
                }}
              >
                Enjoy <strong>sports streaming</strong> with a reliable{" "}
                <strong>IPTV service</strong> designed for smooth live events.
                Watch football, basketball, MMA, racing, and more with stable HD/4K
                playback on Firestick, Kodi, Smart TVs, and mobile.
              </p>
            </div>
            <div className="sports-layout" data-scroll>
              <div className="sports-media">
                <div className="sports-card">
                  <Image
                    src={sportsFootballImageSrc}
                    alt="Live sports streaming"
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 600px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <div className="sports-badge">Live Now</div>
                </div>
              </div>
              <div className="sports-content">
                <div className="sports-highlight">
                  <div className="sports-icon">
                    <Icon name="trophy" className="icon" />
                  </div>
                  <div>
                    <h3>All major leagues</h3>
                    <p>
                      Football, MMA, basketball, racing, and more with stable HD
                      streams.
                    </p>
                  </div>
                </div>
                <div className="sports-highlight">
                  <div className="sports-icon">
                    <Icon name="globe" className="icon" />
                  </div>
                  <div>
                    <h3>Global coverage</h3>
                    <p>
                      USA, UK, EU, and international channels with full EPG support.
                    </p>
                  </div>
                </div>
                <div className="sports-highlight">
                  <div className="sports-icon">
                    <Icon name="bolt" className="icon" />
                  </div>
                  <div>
                    <h3>Low-latency streaming</h3>
                    <p>
                      Optimized servers for smooth live events with minimal
                      buffering.
                    </p>
                  </div>
                </div>
                <div className="sports-cta">
                  <a href="#pricing" className="btn btn-primary">
                    See Plans
                  </a>
                  <a href="#features" className="btn btn-outline">
                    Explore Features
                  </a>
                </div>
              </div>
            </div>

            <SportsMarqueeSection
              title="Major sports, PPV & live events"
              pillKicker="LIVE + VOD"
              pillMeta="HD/4K · multi-device"
              marqueeAriaLabel="Sports categories"
              items={
                [
                  { id: "football", label: "Football" },
                  { id: "basketball", label: "Basketball" },
                  { id: "tennis", label: "Tennis" },
                  { id: "equestrian", label: "Equestrian" },
                  { id: "rugby", label: "Rugby" },
                  { id: "moto", label: "Moto Racing" },
                  { id: "formula", label: "Formula Racing" },
                  { id: "mma", label: "MMA" },
                  { id: "combat", label: "Combat Sports" },
                  { id: "ppv", label: "All PPV Events" },
                ] satisfies SportsMarqueeItem[]
              }
            />
          </div>
        </section>

        <GlobalClientsSectionLazy />

        <section id="movies" className="movies-section">
          <div className="container">
            <div className="movies-layout">
              <div className="movies-content">
                <h2 className="section-title">
                  Movies & Series | IPTV VOD & 4K IPTV Streaming
                </h2>
                <p className="movies-lead">
                  Browse a huge <strong>IPTV VOD</strong> catalog with{" "}
                  <strong>4K IPTV streaming</strong> from a trusted{" "}
                  <strong>IPTV provider</strong>. Log in with{" "}
                  <strong>Xtream IPTV</strong> or a <strong>M3U IPTV playlist</strong>
                  , perfect for <strong>Smart IPTV</strong>,{" "}
                  <strong>IPTV Smarters</strong>, and Firestick users looking for
                  the <strong>best IPTV service</strong>.
                </p>
                <div className="movies-points">
                  <div className="movies-point">
                    <Icon name="play-circle" className="icon" />
                    <span>New releases added daily</span>
                  </div>
                  <div className="movies-point">
                    <Icon name="star" className="icon" />
                    <span>Curated collections in 4K/UHD</span>
                  </div>
                  <div className="movies-point">
                    <Icon name="film" className="icon" />
                    <span>Genre hubs for quick discovery</span>
                  </div>
                </div>
                <div className="movies-cta">
                  <a href="#pricing" className="btn btn-primary">
                    Start Watching
                  </a>
                  <a href="#features" className="btn btn-outline">
                    View Library
                  </a>
                </div>
              </div>
              <div className="movies-wall">
                <div className="movies-wall-card">
                  <div className="movies-wall-header">
                    <span className="movies-pill active">
                      <Icon name="film" className="icon" /> Top Picks
                    </span>
                    <span className="movies-pill">
                      <Icon name="clock" className="icon" /> 180K+ Titles
                    </span>
                  </div>
                  <section className="cinema" aria-label="Movie Channels">
                    <div data-binder="true"></div>
                    <div className="ImageWall_Ef3d78 imageWallFocus">
                      <div className="ImageWall__grid_Ef3d78">
                        {[
                          ["les-4-fantastiques-premiers-pas-film-mcu-banniere.webp", "ratio--169", "Ratio1691"],
                          ["maxresdefault.webp", "ratio--169", "Ratio1692"],
                          ["sinners.webp", "ratio--169", "Ratio1693"],
                          ["fe5c2ef3-1c8a-4c9e-b722-b036f018856c.webp", "ratio--169", "Ratio1694"],
                          ["eszlm4m030kf1.webp", "ratio--34", "Ratio341"],
                          ["Screenshot 2025-12-20 at 12.37.26.webp", "ratio--34", "Ratio342"],
                          ["Screenshot 2025-12-20 at 12.38.08.webp", "ratio--34", "Ratio343"],
                          ["Screenshot 2025-12-20 at 12.39.35.webp", "ratio--34", "Ratio344"],
                        ].map(([img, ratio, ratioClass], idx) => (
                          <div
                            key={idx}
                            className={`ImageWall__grid__item_Ef3d78 ${ratio} ImageWall__grid__item_${ratioClass}_Ef3d78`}
                            data-testid="imageWall-grid-item"
                          >
                            <div className="ImageWall__grid__item__contentWrap_Ef3d78" tabIndex={0} role="link">
                              <a className="ImageWall__grid__item__contentWrap__linker_Ef3d78" data-e2e="linker" aria-disabled="false">
                                <div className="ImageWallContent_34d1ae">
                                  <div data-e2e="poster" className="poster_684939" data-testid="poster">
                                    <Image
                                      src={`/img/films/${img}`}
                                      alt="Movie poster"
                                      fill
                                      sizes={POSTER_SIZES}
                                      className="ImageType_149741 cover poster__cover_684939"
                                      loading="lazy"
                                      placeholder="blur"
                                      blurDataURL={BLUR_DATA_URL}
                                    />
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="howto" className="howto-section">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="howto-grid">
              <div className="howto-card">
                <div className="howto-number">
                  <Icon name="clipboard-check" className="icon" />
                </div>
                <h3 className="howto-title">1. Select Your IPTV Plan</h3>
                <p className="howto-desc">
                  Choose from our top-rated <strong>premium IPTV subscriptions</strong>
                  . We offer flexible plans for 1, 3, 6, or 12 months, ensuring you
                  get the best value from your <strong>IPTV provider</strong>.
                </p>
              </div>
              <div className="howto-card">
                <div className="howto-number">
                  <Icon name="credit-card" className="icon" />
                </div>
                <h3 className="howto-title">2. Secure Checkout</h3>
                <p className="howto-desc">
                  Complete your purchase securely using our encrypted payment gateway.
                  We support major credit cards and other convenient payment methods
                  for a hassle-free transaction.
                </p>
              </div>
              <div className="howto-card">
                <div className="howto-number">
                  <Icon name="tv" className="icon" />
                </div>
                <h3 className="howto-title">3. Start IPTV Streaming</h3>
                <p className="howto-desc">
                  Your <strong>IPTV playlist</strong> and login details arrive via
                  email within minutes. Get <strong>IPTV on Firestick</strong>, Smart
                  TV, or Android in seconds and enjoy the{" "}
                  <strong>best IPTV server</strong> quality available.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-section">
          <div className="container">
            <h2 className="section-title">
              Buy IPTV Subscription | GiGa FliX Plans
            </h2>
            <p
              data-scroll="fade"
              style={{
                textAlign: "center",
                maxWidth: 800,
                margin: "0 auto 30px",
                color: "var(--text-gray)",
              }}
            >
              Choose a plan and <strong>subscribe to IPTV</strong> with a trusted{" "}
              <strong>premium IPTV provider</strong>. GiGa FliX makes it easy to
              get started with monthly or yearly options—fast activation, stable
              servers, and help when you need it.
            </p>
            <div className="pricing-alert" data-scroll>
              <p>
                <strong>Secure & Fast Delivery:</strong> After purchase, you&apos;ll
                receive your IPTV subscription details (Username, Password, URL) via
                email within 1-3 hours. SSL secure payment processing.
              </p>
              <div className="payment-notice">
                <strong>Payment Notice:</strong>
                <p>
                  Do not mention IPTV or related terms in any PayPal message, note, or
                  dispute.
                </p>
              </div>
            </div>

            <div className="pricing-toggle-container" data-scroll="fade">
              <span className="toggle-label active" data-plan="standard">
                Standard Server
              </span>
              <div className="toggle-switch"></div>
              <span className="toggle-label" data-plan="premium">
                Premium Server
              </span>
            </div>

            <div id="standard-plans" className="pricing-container active" data-scroll>
              {[
                { name: "1 Month", price: "€13.45", period: "/mo" },
                {
                  name: "3 Months",
                  price: "€23.36",
                  period: "/3mo",
                  popular: true,
                  badge: "Best Value",
                },
                { name: "6 Months", price: "€35.97", period: "/6mo" },
                { name: "12 Months", price: "€49.13", period: "/yr" },
              ].map((plan, idx) => (
                <Card
                  key={idx}
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                  withBorder
                  radius="xl"
                  padding="lg"
                  shadow={plan.popular ? "md" : "sm"}
                  style={{
                    height: "100%",
                    borderColor: plan.popular ? "var(--primary-color)" : undefined,
                  }}
                >
                  <Stack gap="md">
                    {plan.badge ? (
                      <Group justify="space-between" align="center">
                        <Text
                          fw={800}
                          tt="uppercase"
                          style={{ letterSpacing: 1 }}
                          className="plan-name"
                        >
                          {plan.name}
                        </Text>
                        <Badge variant="filled" radius="sm">
                          {plan.badge}
                        </Badge>
                      </Group>
                    ) : (
                      <Text
                        fw={800}
                        tt="uppercase"
                        style={{ letterSpacing: 1 }}
                        className="plan-name"
                      >
                        {plan.name}
                      </Text>
                    )}

                    <Group align="baseline" gap="xs" className="plan-price">
                      <Text fz={36} fw={900} style={{ lineHeight: 1 }}>
                        {plan.price}
                      </Text>
                      <Text c="dimmed">{plan.period}</Text>
                    </Group>

                    <Stack gap={8}>
                      {[
                        "20K+ HD Channels",
                        "120K+ Movies & Series",
                        "Reliable Performance",
                        "All Devices Supported",
                        "24/7 Live chat support",
                        "Adult Content (Optional)",
                      ].map((label) => (
                        <Group key={label} gap="sm" wrap="nowrap" align="flex-start">
                          <span aria-hidden style={{ marginTop: 2 }}>
                            <Icon name="check" className="icon" />
                          </span>
                          <Text fz="sm" fw={600}>
                            {label}
                          </Text>
                        </Group>
                      ))}
                    </Stack>

                    <Button
                      component="a"
                      href="#"
                      radius="xl"
                      variant={plan.popular ? "filled" : "light"}
                      fullWidth
                      className={`btn ${plan.popular ? "btn-primary" : "btn-outline"}`}
                    >
                      Order Now
                    </Button>

                    <Image
                      src={paymentsImageSrc}
                      alt="Accepted Payment Methods"
                      width={320}
                      height={60}
                      sizes={PAYMENT_SIZES}
                      className="payment-methods-img"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </Stack>
                </Card>
              ))}
            </div>

            <div id="premium-plans" className="pricing-container">
              {[
                { name: "1 Month Premium", price: "€24.23", period: "/mo" },
                {
                  name: "3 Months Premium",
                  price: "€33.54",
                  period: "/3mo",
                  popular: true,
                  badge: "Top Choice",
                },
                { name: "6 Months Premium", price: "€45.47", period: "/6mo" },
                { name: "12 Months Premium", price: "€66.62", period: "/yr" },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                >
                  {plan.badge && (
                    <div className="popular-badge">{plan.badge}</div>
                  )}
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    {plan.price}
                    <span>{plan.period}</span>
                  </div>
                  <ul className="pricing-features">
                    <li>
                      <Icon name="check" className="icon" />{" "}
                      <strong>Premium Anti-Buffer Server</strong>
                    </li>
                    <li>
                      <Icon name="check" className="icon" />{" "}
                      <strong>47K+ 4K/UHD Channels</strong>
                    </li>
                    <li>
                      <Icon name="check" className="icon" />{" "}
                      <strong>180K+ Movies & Series</strong>
                    </li>
                    <li>
                      <Icon name="check" className="icon" />{" "}
                      <strong>Sports Event Priority</strong>
                    </li>
                    <li>
                      <Icon name="check" className="icon" />{" "}
                      <strong>Global Coverage (US/UK/EU)</strong>
                    </li>
                    <li>
                      <Icon name="check" className="icon" />{" "}
                      <strong>Adult Content (Optional)</strong>
                    </li>
                  </ul>
                  <a
                    href="#"
                    className={`btn ${plan.popular ? "btn-primary" : "btn-outline"}`}
                  >
                    Order Now
                  </a>
                  <Image
                    src={paymentsImageSrc}
                    alt="Accepted Payment Methods"
                    width={320}
                    height={60}
                    sizes={PAYMENT_SIZES}
                    className="payment-methods-img"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="container">
            <h2 className="section-title">
              Premium IPTV Provider | Anti-Freeze IPTV for Firestick & Kodi
            </h2>
            <p
              style={{
                textAlign: "center",
                maxWidth: 800,
                margin: "0 auto 40px",
                color: "var(--text-gray)",
              }}
            >
              Looking for the <strong>best IPTV services</strong> and{" "}
              <strong>best IPTV service</strong> performance? GiGa FliX stands out
              among <strong>IPTV service providers</strong> and{" "}
              <strong>IPTV providers</strong> as a{" "}
              <strong>premium IPTV provider</strong> with{" "}
              <strong>anti-freeze IPTV</strong> technology,{" "}
              <strong>IPTV service 4K</strong>, and support for{" "}
              <strong>Smart IPTV</strong>, <strong>IPTV Smarters</strong>,{" "}
              <strong>Xtream IPTV</strong>, and <strong>IPTV m3u playlist</strong>{" "}
              access.
            </p>
            <div className="features-grid">
              {[
                {
                  icon: "tv",
                  title: "47,000+ Live Channels & IPTV Streams",
                  desc: "Browse a huge IPTV list of IPTV channels from USA, UK, and worldwide. Watch via M3U IPTV playlist or Xtream IPTV with smooth 4K playback.",
                },
                {
                  icon: "film",
                  title: "180,000+ Movies & Series (IPTV VOD)",
                  desc: "Unlock a massive library with your IPTV subscription. Fresh releases are added daily so you always have something great to watch.",
                },
                {
                  icon: "bolt",
                  title: "Anti-Freeze IPTV Servers",
                  desc: "Our optimized IPTV server delivers no buffering IPTV performance for sports streaming, with stable 4K quality during live events.",
                },
                {
                  icon: "headset",
                  title: "24/7 Expert Support",
                  desc: "Need help to subscribe to IPTV or set up? Our team is available anytime to get you streaming in minutes.",
                },
                {
                  icon: "cogs",
                  title: "Best IPTV for Firestick & Apps",
                  desc: "Works with IPTV on Firestick, IPTV on Kodi, Smart IPTV, IPTV Smarters, and more across Smart TVs and mobile devices.",
                },
                {
                  icon: "shield-alt",
                  title: "Trusted Premium IPTV Provider",
                  desc: "Stream confidently with secure delivery and a proven record as a top rated IPTV service trusted by global users.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-icon">
                    <Icon name={feature.icon as any} className="icon" />
                  </div>
                  <div className="feature-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>
                Devices for IPTV on Firestick, Kodi & Smart IPTV
              </h2>
              <div className="section-description">
                <p className="lead-text">
                  Stream your favorite content on any device with our{" "}
                  <strong>premium IPTV</strong> service. Whether you use{" "}
                  <strong>IPTV on Firestick</strong>, <strong>Kodi</strong>, or{" "}
                  <strong>Smart IPTV</strong> apps, our <strong>IPTV server</strong>{" "}
                  ensures smooth playback on all devices.
                </p>
              </div>
            </div>
          </div>
          <div className="supported-devices">
            <div className="content-container">
              <div className="devices-title">
                <p>Watch on your favourite devices.</p>
                <span className="gold-color">Anywhere, anytime.</span>
              </div>
              <span className="devices-description">
                Whether you are at home or on the go, streaming is available on a wide
                range of mobile and connected devices including Smart TVs, Chromecast,
                Playstation, Xbox and more.
              </span>
              <div className="device-divider">
                <div className="line"></div>
                <div className="device-header">
                  <span>Our leading supported devices</span>
                </div>
                <div className="line"></div>
              </div>
              <div className="logo-container">
                {[
                  "Group_2147224066.png",
                  "Group_2147224067.png",
                  "h.png",
                  "imabge.png",
                  "image.png",
                  "imfage.png",
                  "j.png",
                  "k.png",
                  "Layer_1.png",
                  "o.png",
                  "t.png",
                  "u.png",
                  "v.png",
                ].map((logo, idx) => (
                  <Image
                    key={idx}
                    src={`/img/devices/${logo}`}
                    alt="Device logo"
                    width={80}
                    height={80}
                    className="device-logo"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews-section">
          <div className="container">
            <h2 className="section-title">Top Rated IPTV Reviews</h2>
            <p
              style={{
                textAlign: "center",
                maxWidth: 800,
                margin: "0 auto 30px",
                color: "var(--text-gray)",
              }}
            >
              These reviews reflect why GiGa FliX is a <strong>top rated IPTV</strong>{" "}
              choice and one of the <strong>best IPTV</strong> options, often the{" "}
              <strong>best for IPTV</strong> fans who want smooth{" "}
              <strong>IPTV streaming</strong> and reliable <strong>IPTV stream</strong>{" "}
              quality. If you are comparing <strong>provider IPTV</strong> options such
              as zeroiptv, plex iptv, or pleasure iptv, focus on stability, support, and
              anti-freeze performance.
            </p>
            <div className="reviews-grid">
              {[
                {
                  stars: 5,
                  text: '"The best IPTV service 2025 hands down. No buffering during big matches and the picture quality is amazing. Highly recommend this IPTV provider."',
                  author: "John D.",
                },
                {
                  stars: 4.5,
                  text: '"Great selection of movies and series. My family loves the IPTV streams quality. The best IPTV for reliable entertainment!"',
                  author: "Sarah M.",
                },
                {
                  stars: 5,
                  text: '"Support was very helpful setting up my device. Everything works perfectly now. Definitely a top rated IPTV service."',
                  author: "Michael R.",
                },
              ].map((review, idx) => (
                <div key={idx} className="review-card">
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name={
                          i < Math.floor(review.stars)
                            ? "star"
                            : i < review.stars
                              ? "star-half"
                              : "star"
                        }
                        className="icon"
                      />
                    ))}
                  </div>
                  <p className="review-text">{review.text}</p>
                  <p className="review-author">- {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div className="container">
            <h2 className="section-title">IPTV FAQ | GiGa FliX IPTV Service</h2>
            <Accordion
              data-scroll
              variant="separated"
              radius="lg"
              styles={{
                item: {
                  border: "1px solid rgba(17, 24, 39, 0.12)",
                  background: "#fff",
                },
              }}
            >
              {[
                {
                  q: "What do I need for IPTV?",
                  a: "To use our IPTV service, you need: a Smart TV with an IPTV app, a Firestick, or any device that supports M3U IPTV playlists. We provide full setup support for IPTV on Firestick and other devices.",
                },
                {
                  q: "Do I need a VPN for IPTV?",
                  a: "A VPN encrypts your traffic and protects your privacy. While not mandatory, it is recommended for extra security with your premium IPTV subscription and to avoid ISP throttling.",
                },
                {
                  q: "Can I watch IPTV on my phone?",
                  a: "Yes! Use IPTV apps like IPTV Smarters Pro on your phone. We provide credentials compatible with the best IPTV player apps for mobile streaming on the go.",
                },
                {
                  q: "Do you need a good Wi-Fi connection for IPTV?",
                  a: "It is generally recommended to have an internet connection of at least 10 Mbps for HD streaming and 16 Mbps for Ultra HD 4K streaming.",
                },
                {
                  q: "Can IPTV work on a regular television?",
                  a: "You can use our IPTV service on regular TVs by using an external IPTV box or Firestick. These devices connect to your TV's HDMI port and provide the best IPTV player experience.",
                },
              ].map((faq) => (
                <Accordion.Item key={faq.q} value={faq.q}>
                  <Accordion.Control>{faq.q}</Accordion.Control>
                  <Accordion.Panel>
                    <Text c="dimmed" fz="sm">
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </section>
    </>
  );
}
