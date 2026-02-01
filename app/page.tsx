'use client';

import Link from 'next/link';
import { ArrowRight, Droplet, Leaf, TrendingUp, AlertCircle, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary to-background pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                    AI-Powered Agriculture
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                  Grow Smarter, Not Harder
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  GrowWise delivers precision irrigation and fertilizer recommendations for every row in your greenhouse. Save water, maximize yield, and optimize costs with AI-powered insights.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" asChild className="rounded-full font-semibold">
                    <Link href="/advisory" className="flex items-center gap-2">
                      Start Free Advisory
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-full font-semibold bg-transparent">
                    <Link href="/contact">Schedule Demo</Link>
                  </Button>
                </div>

                <div className="flex gap-8 pt-8 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold text-foreground">40%</p>
                    <p className="text-muted-foreground">Water Savings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">25%</p>
                    <p className="text-muted-foreground">Yield Increase</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">3 Days</p>
                    <p className="text-muted-foreground">Setup Time</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden">
                  <div 
                    className="aspect-square rounded-xl flex items-center justify-center text-white relative"
                    style={{
                      backgroundImage: 'url(/greenhouse-bg.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Dark overlay for text visibility */}
                    <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
                    <div className="text-center space-y-4 relative z-10">
                      <Leaf className="w-24 h-24 mx-auto opacity-90" />
                      <p className="text-lg font-semibold">Precision Growing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Comprehensive tools designed specifically for modern greenhouse farmers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Droplet className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Smart Irrigation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time soil moisture monitoring with AI-powered recommendations tailored to each row and crop type.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Leaf className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Fertilizer Optimization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stage-specific nutrient recommendations that maximize uptake and promote healthy crop development.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Row-Wise Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Detailed performance metrics for every row with water savings, efficiency scores, and growth tracking.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <AlertCircle className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Risk Detection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Early warnings for disease risks, drought stress, nutrient deficiencies, and environmental threats.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Instant Setup</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Simple, intuitive interface requiring no technical expertise. Get started in minutes, not weeks.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Sustainable Farming</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reduce environmental impact through optimized resource usage and eco-friendly recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                How GrowWise Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Three simple steps to optimize your greenhouse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Input Your Data</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tell us about your greenhouse, crops, soil type, and irrigation setup in our simple setup wizard.
                  </p>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute top-24 -right-6 w-12 h-1 bg-gradient-to-r from-primary to-transparent"></div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Get AI Recommendations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI analyzes your greenhouse and generates row-wise irrigation and fertilizer recommendations.
                  </p>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute top-24 -right-6 w-12 h-1 bg-gradient-to-r from-primary to-transparent"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Monitor & Optimize</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track real-time metrics, view performance dashboards, and adjust strategies based on data insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary to-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10 text-pretty">
              Join farmers already saving water, boosting yields, and reducing costs with GrowWise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild variant="secondary" className="rounded-full font-semibold">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="rounded-full font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-primary-foreground">
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
