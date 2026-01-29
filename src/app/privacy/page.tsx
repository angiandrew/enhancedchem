import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					<span className="text-sm font-medium">Return to Home</span>
				</Link>
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Privacy Policy
				</h1>

				<div className="bg-white rounded-lg shadow-sm p-8">
					<div className="prose prose-gray max-w-none">
						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article I — Introduction</h2>
							<p className="text-gray-600 mb-4">
								Enhanced Chem LLC (&quot;Company,&quot; &quot;Enhanced Chem,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy (&quot;Policy&quot;) describes how we collect, use, disclose, and safeguard your information when you visit our website at https://www.enhancedchem.com (the &quot;Website&quot;), create an account, purchase products, or interact with our services (collectively, &quot;Services&quot;). This Policy applies to all users and purchasers (collectively, &quot;you&quot; or &quot;your&quot;).
							</p>
							<p className="text-gray-600 mb-4">
								By accessing the Website or using our Services, you consent to the practices described in this Policy. If you do not agree, you must immediately stop using the Website and Services. This Policy is incorporated into our Terms and Conditions of Use and Sale, and your use is subject to both.
							</p>
							<p className="text-gray-600 mb-4">
								We reserve the right to update this Policy at any time. Changes will be posted with an updated &quot;Last Updated&quot; date, and your continued use constitutes acceptance of the revised Policy.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article II — Information We Collect</h2>
							<p className="text-gray-600 mb-4">
								We collect information you provide directly, information collected automatically, and information from third parties. Categories include:
							</p>
							<ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
								<li><strong>Personal Identifiers:</strong> Name, email address, phone number, mailing address, and account login details when you register, place an order, or contact us.</li>
								<li><strong>Payment Information:</strong> Billing details processed securely through third-party payment processors. We do not store full credit card numbers.</li>
								<li><strong>Verification Data:</strong> Institutional affiliations, research credentials, or other documentation to confirm eligibility for research-only purchases.</li>
								<li><strong>Technical Data:</strong> IP address, browser type, device information, operating system, referral sources, and Website usage data collected via cookies, pixels, or similar technologies.</li>
								<li><strong>Communications Data:</strong> Any information from emails, inquiries, support requests, or feedback you submit.</li>
								<li><strong>Other Data:</strong> Any additional information you voluntarily provide, such as preferences or survey responses.</li>
							</ul>
							<p className="text-gray-600 mb-4">
								We do not collect sensitive personal information (e.g., health data, genetic information) unless required for verification, and only with your explicit consent where applicable.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article III — How We Collect Information</h2>
							<ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
								<li><strong>Directly from You:</strong> When you create an account, place an order, subscribe to newsletters, or communicate with us.</li>
								<li><strong>Automatically:</strong> Through cookies, web beacons, and analytics tools that track your interactions with the Website (e.g., pages viewed, time spent).</li>
								<li><strong>From Third Parties:</strong> From service providers (e.g., payment processors, analytics partners) or verification services to ensure compliance.</li>
							</ul>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article IV — How We Use Your Information</h2>
							<p className="text-gray-600 mb-4">
								We use your information for legitimate business purposes, including:
							</p>
							<ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
								<li>Processing and fulfilling orders, including shipping and payment verification.</li>
								<li>Verifying research affiliations and compliance with laws (e.g., export controls, sanctions screening).</li>
								<li>Providing customer support and responding to inquiries.</li>
								<li>Improving the Website, Services, and user experience through analytics.</li>
								<li>Detecting and preventing fraud, abuse, or security incidents.</li>
								<li>Complying with legal obligations, such as tax reporting or regulatory audits.</li>
								<li>Sending administrative communications (e.g., order confirmations) or, with your consent, marketing materials.</li>
							</ul>
							<p className="text-gray-600 mb-4">
								We process information based on contractual necessity, legal requirements, legitimate interests (e.g., security), or your consent.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article V — Sharing and Disclosure of Information</h2>
							<p className="text-gray-600 mb-4">
								We do not sell, rent, or trade your personal information. We may share it in limited circumstances:
							</p>
							<ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
								<li><strong>Service Providers:</strong> With vendors (e.g., payment processors, shipping carriers, analytics firms) bound by confidentiality and used solely for our Services.</li>
								<li><strong>Legal and Compliance:</strong> To Governmental Authorities if required by law, subpoena, or regulation; or to enforce our rights, prevent fraud, or protect safety.</li>
								<li><strong>Business Transfers:</strong> To successors in the event of a merger, acquisition, or asset sale.</li>
								<li><strong>Aggregated Data:</strong> Non-personal, anonymized data for analytics or research.</li>
							</ul>
							<p className="text-gray-600 mb-4">
								We may disclose data for sanctions screening or export compliance checks via third-party tools.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article VI — Data Security</h2>
							<p className="text-gray-600 mb-4">
								We implement reasonable administrative, technical, and physical measures to protect your information, including encryption, access controls, and secure servers. However, no system is infallible, and we cannot guarantee absolute security. You are responsible for safeguarding your account credentials.
							</p>
							<p className="text-gray-600 mb-4">
								In the event of a data breach, we will notify affected users as required by law and take steps to mitigate harm. We disclaim liability for unauthorized access due to factors beyond our control.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article VII — Data Retention</h2>
							<p className="text-gray-600 mb-4">
								We retain personal information only as long as necessary for the purposes outlined, legal compliance, or dispute resolution (typically 7 years for financial records). When no longer needed, data is securely deleted or anonymized.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article VIII — Cookies and Tracking Technologies</h2>
							<p className="text-gray-600 mb-4">
								We use cookies, pixels, and similar tools for functionality, analytics, and personalization. These may include:
							</p>
							<ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
								<li>Essential cookies for site operation.</li>
								<li>Analytics cookies to track usage (e.g., via Google Analytics).</li>
								<li>Advertising cookies for targeted promotions, if applicable.</li>
							</ul>
							<p className="text-gray-600 mb-4">
								You can manage cookies through browser settings, but disabling them may limit functionality. For more details, see our Cookie Policy (if separate) or contact us.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article IX — Your Privacy Rights</h2>
							<p className="text-gray-600 mb-4">
								Depending on your location and applicable laws (e.g., CCPA for California residents, GDPR for EU users), you may have rights to:
							</p>
							<ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
								<li>Access, correct, or delete your data.</li>
								<li>Opt out of data sales (though we do not sell data).</li>
								<li>Restrict processing or request portability.</li>
								<li>Withdraw consent where applicable.</li>
							</ul>
							<p className="text-gray-600 mb-4">
								Submit requests to privacy@enhancedchem.com with verification. We will respond within the legally required timeframe (e.g., 45 days for CCPA). We may deny requests if they conflict with legal obligations.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article X — Children&apos;s Privacy</h2>
							<p className="text-gray-600 mb-4">
								Our Website and Services are not intended for individuals under 21. We do not knowingly collect data from minors. If we discover such data, it will be deleted immediately.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article XI — International Data Transfers</h2>
							<p className="text-gray-600 mb-4">
								If you are outside the U.S., your data may be transferred to and processed in the U.S., where privacy laws may differ. By using our Services, you consent to such transfers. We use appropriate safeguards (e.g., standard contractual clauses) for international transfers where required.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article XII — Third-Party Links and Services</h2>
							<p className="text-gray-600 mb-4">
								The Website may contain links to third-party sites. We are not responsible for their privacy practices. Review their policies before providing information.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article XIII — Governing Law and Dispute Resolution</h2>
							<p className="text-gray-600 mb-4">
								This Policy is governed by Florida law, without regard to conflicts principles. Disputes shall be resolved through binding arbitration in Palm Beach County, Florida, under AAA Commercial Rules. You waive class actions and jury trials.
							</p>
						</section>

						<section className="mb-4">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article XIV — Contact Information</h2>
							<p className="text-gray-600 mb-4">
								For questions or requests:
							</p>
							<p className="text-gray-600 mb-1 font-medium">Enhanced Chem LLC</p>
							<p className="text-gray-600 mb-1">7901 4TH ST N STE 300</p>
							<p className="text-gray-600 mb-1">ST. PETERSBURG, FL 33702</p>
							<p className="text-gray-600 mb-1">Email: contact@enhancedchem.com</p>
							<p className="text-gray-600">Website: https://www.enhancedchem.com</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}
