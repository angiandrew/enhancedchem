import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					ENHANCED CHEM LLC – TERMS AND CONDITIONS OF USE AND SALE
				</h1>
				<p className="text-gray-600 mb-8">Effective Date: 10/01/2025</p>

				<div className="bg-white rounded-lg shadow-sm p-8">
					<div className="prose prose-gray max-w-none">
						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article I — Agreement and Acceptance</h2>
							<p className="text-gray-600 mb-4">
								This Terms and Conditions Agreement (&quot;Agreement&quot;) constitutes a legally binding contract between Enhanced Chem LLC, a Florida limited liability company (&quot;Company,&quot; &quot;Enhanced Chem,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), and any person or entity accessing, using, or purchasing from our website, https://www.enhancedchem.com (&quot;Website&quot;), collectively referred to as &quot;User&quot; or &quot;Purchaser.&quot;
							</p>
							<p className="text-gray-600 mb-4">
								By accessing the Website, browsing, creating an account, or purchasing any product (&quot;Product&quot;), the User expressly acknowledges that they have read, understood, and agree to be bound by this Agreement, including all terms, conditions, policies, and disclaimers incorporated herein by reference. If you do not agree with these terms, you must immediately cease use of the Website and all associated services.
							</p>
							<p className="text-gray-600 mb-4">
								The Company reserves the right to amend, modify, or update this Agreement at any time, with or without notice, in its sole and absolute discretion. Continued use of the Website or purchase of Products after any such changes constitutes your irrevocable acceptance of the revised Agreement. It is your sole responsibility to review this Agreement periodically for updates. If you do not agree to any changes, your sole remedy is to immediately cease all use of the Website and notify the Company in writing.
							</p>
							<p className="text-gray-600 mb-4">
								By checking any acceptance box, clicking &quot;I Agree,&quot; or using any equivalent online acceptance mechanism during the enrollment, registration, or purchase process, you expressly acknowledge and agree that such action constitutes your electronic signature, which is the legal equivalent of your handwritten signature and has the same binding force and effect. You represent and warrant that you have the full legal capacity and authority to enter into this Agreement, and by providing such electronic acceptance, you irrevocably agree to be bound by all terms, conditions, obligations, representations, warranties, and disclaimers set forth in this Agreement in their entirety, without reservation or exception, as if you had signed this Agreement manually in ink. You waive any rights or defenses related to the validity or enforceability of this Agreement based on the electronic nature of your acceptance, and you consent to the use of electronic records and signatures in accordance with applicable laws, including but not limited to the Electronic Signatures in Global and National Commerce Act (E-SIGN) and the Uniform Electronic Transactions Act (UETA). The Company may rely on your electronic acceptance as conclusive evidence of your intent to be bound, and no further signature or confirmation is required.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article II — Definitions</h2>
							<ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
								<li><strong>Agreement:</strong> Refers to these Terms and Conditions of Use and Sale, including all incorporated policies, disclaimers, and amendments as may be made from time to time by the Company in its sole discretion.</li>
								<li><strong>Company:</strong> Refers to Enhanced Chem LLC, its parent companies, subsidiaries, affiliates, officers, directors, managers, members, employees, agents, contractors, successors, assigns, and representatives.</li>
								<li><strong>Affiliates:</strong> Means any entity or individual that directly or indirectly controls, is controlled by, or is under common control with Enhanced Chem LLC, including but not limited to its members, officers, employees, contractors, agents, related business entities, and any third parties providing services on behalf of the Company.</li>
								<li><strong>User:</strong> Any person or entity accessing, browsing, or interacting with the Website for informational, educational, or any other purposes, whether or not a purchase is made.</li>
								<li><strong>Purchaser:</strong> Any person or entity completing a transaction, attempting to purchase, or purchasing Products offered by the Company, including any agents or representatives acting on their behalf.</li>
								<li><strong>Products:</strong> Means all research chemicals, peptides, materials, substances, reagents, instruments, laboratory supplies, and any other items offered for sale by Enhanced Chem LLC, all of which are provided strictly for in vitro research, laboratory use, and scientific experimentation only and are not intended for any other purpose.</li>
								<li><strong>Services:</strong> Means all online, informational, and digital materials made available through the Website, including but not limited to product descriptions, data sheets, documentation, educational or promotional content, customer support, account management, and any other features or functionalities provided by the Company.</li>
								<li><strong>Website:</strong> Includes the domain enhancedchem.com and any associated subdomains, redirects, mobile applications, social media accounts, or other digital platforms operated or controlled by Enhanced Chem LLC.</li>
								<li><strong>Account:</strong> Means any online profile, registration, customer portal, or login credentials used to facilitate transactions, track orders, communicate with Enhanced Chem LLC, or access restricted content.</li>
								<li><strong>Intellectual Property:</strong> Means all trademarks, service marks, trade names, logos, copyrights, patents, trade secrets, content, materials, derivatives, and other proprietary rights owned, operated, or licensed by Enhanced Chem LLC, including all derivative works, associated goodwill, and any user-generated content assigned to the Company.</li>
								<li><strong>Governmental Authority:</strong> Any federal, state, local, or foreign government, agency, court, tribunal, regulatory body, or enforcement entity, including but not limited to the FDA, DEA, FTC, IRS, SEC, EPA, OSHA, DOT, and any equivalents.</li>
								<li><strong>State:</strong> The State of Florida, United States of America, unless otherwise specified in this Agreement.</li>
								<li><strong>Business Day:</strong> Any day other than a Saturday, Sunday, or U.S. federal holiday, based on the Eastern Time Zone.</li>
								<li><strong>Confidential Information:</strong> All non-public information disclosed by the Company, whether oral, written, electronic, or in any other form, including but not limited to trade secrets, product formulations, customer lists, pricing details, marketing strategies, business plans, research data, supplier information, financial data, and any other proprietary information.</li>
								<li><strong>Claims:</strong> Any and all claims, demands, actions, suits, proceedings, investigations, losses, damages, liabilities, judgments, settlements, costs, expenses (including reasonable attorneys&apos; fees, expert fees, court costs, and disbursements), fines, penalties, taxes, interest, or any other obligations arising out of, related to, or in connection with this Agreement, the Website, Products, or Services.</li>
								<li><strong>Indemnified Parties:</strong> The Company and its parent companies, subsidiaries, affiliates, officers, directors, managers, members, employees, agents, contractors, successors, assigns, and representatives.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article III — Eligibility and Compliance</h2>
							<ol className="list-decimal list-inside space-y-3 text-gray-600 mb-4">
								<li><strong>Age Requirement:</strong> Purchasers must be at least 21 years of age and legally capable of entering into binding contracts. By placing an order, the Purchaser represents and warrants that they meet this age requirement and have the full legal capacity to bind themselves or their entity to this Agreement.</li>
								<li><strong>Legal Compliance:</strong> The Purchaser agrees to comply with all applicable federal, state, local, and international laws, regulations, and guidelines, including but not limited to FDA regulations, DEA guidelines, FTC advertising standards, export controls, anti-money laundering laws, privacy laws, and any other requirements regarding the purchase, possession, handling, storage, use, and disposal of Products. The Company assumes no responsibility or liability for the Purchaser&apos;s compliance with such laws, and the Purchaser indemnifies the Company against any Claims arising from non-compliance.</li>
								<li><strong>Right to Refuse Service:</strong> Enhanced Chem reserves the absolute right, at its sole discretion, to refuse or cancel any order, deny access to the Website, suspend or terminate any Account, or revoke any permissions for any reason or no reason, including but not limited to legal restrictions, regulatory concerns, potential misuse, fraud, suspected violations of this Agreement, or any other factor deemed relevant by the Company, without notice or liability. Denial, suspension, or revocation is final and non-appealable.</li>
								<li><strong>Purchaser Verification and Research Affiliation:</strong> By purchasing any Product, the Purchaser represents and warrants that they are acting on behalf of, or in affiliation with, a recognized research organization, including but not limited to a university laboratory, independent research facility, contract research organization (CRO), or government/public research institute. The Purchaser acknowledges that all Products must be used solely for in-vitro, non-human, non-animal research purposes only, such as cell culture studies, chemical analysis, or other laboratory experimentation not involving living beings. The Purchaser further certifies that all Products will be used solely for lawful, in-vitro, laboratory-based research and scientific experimentation only, and not for any other purpose. Enhanced Chem LLC expressly prohibits the sale or use of its Products to or by individuals who are not qualified or affiliated with such research entities. The Company may require proof of affiliation (e.g., institutional email, research credentials, or documentation) at any time, and failure to provide such proof will result in immediate order cancellation, Account termination, and forfeiture of any payments, without refund or liability.</li>
								<li><strong>Background and Compliance Checks:</strong> The Purchaser consents to the Company conducting background checks, credit checks, compliance audits, or other verifications using any provided information, and releases the Company from any liability arising from such activities. The Purchaser must submit to and pass any such checks required by the Company at their sole expense.</li>
								<li><strong>Anti-Bribery and Anti-Corruption:</strong> The Purchaser agrees to comply with all applicable anti-bribery and anti-corruption laws, including but not limited to the U.S. Foreign Corrupt Practices Act (FCPA) and equivalent international laws. The Purchaser shall not, directly or indirectly, offer, promise, give, or accept any bribe, kickback, or other improper payment or advantage in connection with any purchase or use of Products.</li>
								<li><strong>Monitoring and Enforcement for Misuse:</strong> The Company reserves the right to monitor Purchaser activities, including but not limited to order history, communications, and public promotions, for suspected misuse or promotion of Products for human or animal use, consumption, or any prohibited purpose. If the Company, in its sole discretion, suspects or determines such misuse or promotion, it may take immediate action, including but not limited to blacklisting the Purchaser, terminating the Account, canceling orders without refund, reporting to Governmental Authorities, pursuing legal action for damages or injunctions, and any other remedies available at law or in equity. The Company assumes no liability for any misuse of Products, and the Purchaser indemnifies the Company against all Claims arising from such misuse.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article IV — Research Use Only / Not for Human or Animal Use</h2>
							<ol className="list-decimal list-inside space-y-3 text-gray-600 mb-4">
								<li><strong>Research Purposes Only:</strong> Enhanced Chem LLC operates solely as a supplier of research chemicals. Enhanced Chem LLC is not a compounding pharmacy or chemical compounding facility as defined under Section 503A of the Federal Food, Drug, and Cosmetic Act, nor an outsourcing facility as defined under Section 503B of the same Act. All Products offered by Enhanced Chem LLC are intended solely for laboratory and in-vitro research use by qualified researchers in controlled settings. They are not intended for human or veterinary use under any circumstances. The Purchaser acknowledges and agrees that Products can never under any circumstances be ingested, injected, applied topically, or consumed by humans or administered to humans or animals.</li>
								<li><strong>No Medical or Diagnostic Use:</strong> Products are not drugs, medical devices, dietary supplements, cosmetics, or nutraceuticals, and are not intended to diagnose, treat, cure, mitigate, prevent, or alleviate any disease, condition, or ailment in humans or animals. The Purchaser is strictly prohibited from making any claims, representations, or implications that Products can be used for such purposes.</li>
								<li><strong>Qualified Handling Only:</strong> Products must be handled only by qualified and properly trained research professionals familiar with laboratory protocols, material safety procedures, and handling of potentially hazardous substances. The Purchaser represents and warrants that all handling will occur in a professional laboratory environment.</li>
								<li><strong>No Consumption or Administration:</strong> Products must not be ingested, injected, inhaled, applied to the skin, or administered in any way to humans or animals. This prohibition includes any representation that Products can ever under any circumstances be used for human or animal consumption, ingestion, injection, topical application, or any form of administration to living beings. Ingesting or administering these materials may result in serious injury, permanent harm, or death, and the Purchaser assumes all risks and indemnifies the Company against any related Claims.</li>
								<li><strong>Safe Handling and Hazard Responsibility:</strong> Enhanced Chem LLC does not provide Safety Data Sheets (SDS) for research-only materials unless required by law. The Purchaser is solely responsible for conducting all necessary due diligence, safety assessments, risk evaluations, and hazard identifications prior to handling any Product. All Products must be handled exclusively by qualified professionals in controlled laboratory settings using appropriate protective equipment, procedures, and disposal methods. The Purchaser indemnifies the Company against any Claims arising from improper handling, storage, or disposal.</li>
								<li><strong>FDA and Regulatory Disclaimer:</strong> None of the Products offered on this Website have been evaluated, approved, endorsed, or cleared by the U.S. Food and Drug Administration (FDA), Drug Enforcement Administration (DEA), or any other regulatory authority for any purpose. Products are not controlled substances under the U.S. Controlled Substances Act (21 U.S.C. §801 et seq.) but are provided strictly for research use only and are not intended for use in humans or animals. The Purchaser is solely responsible for compliance with all applicable FDA, DEA, OSHA, EPA, DOT, and state or local regulations pertaining to the possession, handling, use, storage, and disposal of such Products. The Company makes no warranties regarding product efficacy, quality, purity, safety, or compliance with GMP standards, and the Purchaser assumes all risks.</li>
								<li><strong>Export Controls and Sanctions Compliance:</strong> The Purchaser agrees to comply with all applicable export control laws and regulations, including but not limited to the U.S. Export Administration Regulations (EAR) and International Traffic in Arms Regulations (ITAR), and not to promote, facilitate, or engage in sales, transfers, or uses involving any sanctioned countries, entities, or individuals as designated by the U.S. Department of Treasury&apos;s Office of Foreign Assets Control (OFAC) or equivalent authorities. The Purchaser indemnifies the Company against any Claims arising from violations of export controls or sanctions.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article V — Assumption of Risk, Waiver, Hold Harmless, and Indemnification</h2>
							<ol className="list-decimal list-inside space-y-3 text-gray-600 mb-4">
								<li><strong>Assumption of Risk:</strong> The Purchaser recognizes the inherent hazards associated with the handling, utilization, and distribution of these materials, and affirms that they possess the appropriate equipment, premises, and qualified staff to manage such hazards; the Purchaser voluntarily assumes all associated risks. The Purchaser acknowledges full responsibility for the safe handling, storage, use, and disposal of all Products and assumes all risks associated therewith, including but not limited to legal, financial, reputational, operational, and personal risks. The Purchaser bears all consequences of any misuse or non-compliance.</li>
								<li><strong>Waiver of Claims:</strong> The Purchaser expressly waives any and all claims against Enhanced Chem LLC and the Indemnified Parties arising from or related to the use, misuse, handling, storage, or disposal of any Product, including but not limited to claims of negligence, strict liability, breach of warranty, or any other theory of liability.</li>
								<li><strong>Hold Harmless:</strong> The Purchaser agrees to hold harmless Enhanced Chem LLC and the Indemnified Parties from any and all Claims arising from or related to the purchase, handling, use, misuse, storage, or disposal of any Product, including, without limitation, bodily injury, property damage, economic loss, or death.</li>
								<li><strong>Indemnification:</strong> The Purchaser agrees to indemnify, defend, and hold harmless the Indemnified Parties from and against all Claims arising out of, related to, or in connection with, directly or indirectly: (i) any breach or alleged breach of this Agreement, including any representations, warranties, or covenants; (ii) any use, misuse, handling, storage, or disposal of Products; (iii) any violation of applicable laws, regulations, or industry standards by the Purchaser; (iv) any third-party claims related to the Purchaser&apos;s use of the Company&apos;s Intellectual Property, Products, data, or Services; privacy violations; consumer protection issues; intellectual property infringement; defamation; fraud; negligence; or any tortious or contractual liability; (v) any personal injury, property damage, economic loss, or other harm allegedly caused by Products; (vi) any taxes, fees, or withholdings related to the Purchaser&apos;s transactions; or (vii) any other matter arising from the Purchaser&apos;s use of the Website, Products, or Services. This indemnification obligation is unlimited in amount and scope, applies to Claims by any party (including Governmental Authorities), and survives the termination or expiration of this Agreement indefinitely. The Purchaser must notify the Company immediately of any potential Claim and cooperate fully in the defense at the Purchaser&apos;s sole expense, including providing all documents, information, and testimony requested. The Company may assume control of the defense at any time, and the Purchaser agrees to reimburse all costs. The Purchaser may not settle any Claim without the Company&apos;s prior written consent.</li>
								<li><strong>No Personal Liability:</strong> The Purchaser agrees that no member, manager, officer, employee, contractor, or agent of Enhanced Chem LLC shall have any personal liability under this Agreement or any transaction conducted hereunder. The Purchaser&apos;s sole recourse shall be limited to claims, if any, against Enhanced Chem LLC as a legal entity.</li>
								<li><strong>No Liability for Misuse:</strong> The Company assumes no responsibility or liability whatsoever for any misuse, improper use, or non-research use of Products, including but not limited to human or animal consumption, medical applications, or any prohibited activities. The Purchaser bears all risks and indemnifies the Company against all Claims arising from misuse.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article VI — Domestic Shipping Only</h2>
							<p className="text-gray-600 mb-4">
								Enhanced Chem LLC ships exclusively within the United States. We do not ship, sell, or distribute Products outside the U.S. Any order placed with an international billing or shipping address will be automatically cancelled and refunded without liability. Enhanced Chem LLC assumes no responsibility or liability for any attempt to forward, export, or transfer Products beyond U.S. borders, and the Purchaser indemnifies the Company against any Claims arising from such attempts.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article VII — Shipping, Delivery, and Risk of Loss</h2>
							<p className="text-gray-600 mb-4">
								All shipments are made FOB Origin, meaning title and risk of loss transfer to the Purchaser once the shipment is tendered to the carrier. This includes, but is not limited to, carriers such as the United States Postal Service (USPS), United Parcel Service (UPS), FedEx, and DHL. Enhanced Chem LLC is not responsible for lost, delayed, misdelivered, damaged, or seized shipments once the package has been accepted by the carrier. The Purchaser assumes all risks of transportation and indemnifies the Company against any related Claims.
							</p>
							<p className="text-gray-600 mb-4">
								Orders are processed and shipped during regular business hours, Monday through Friday, excluding U.S. federal holidays. Business Days are defined as weekdays (Monday through Friday) that are not U.S. federal holidays; this excludes weekends and holidays to ensure processing occurs only during standard operational periods. The Company makes no guarantees regarding shipping timelines, delivery dates, or carrier performance.
							</p>
							<p className="text-gray-600 mb-4">
								Enhanced Chem LLC may, at its discretion, require adult signature upon delivery to ensure secure receipt, and failure to comply with delivery requirements may result in order cancellation without refund.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article VIII — Product Accuracy, COAs, and Label Disclosure</h2>
							<ol className="list-decimal list-inside space-y-3 text-gray-600 mb-4">
								<li><strong>Certificates of Analysis (COA):</strong> Certificates of Analysis (COAs) may be provided at the sole discretion of Enhanced Chem LLC. The Company makes no guarantee that a COA will accompany any specific Product, and does not warrant that any provided COA is 100% accurate, as errors, inaccuracies, or discrepancies may occur. The Purchaser assumes all risks associated with product verification.</li>
								<li><strong>Product Label Accuracy:</strong> Enhanced Chem LLC does not guarantee or warrant that the contents of any Product are identical to the labeling, analytical data, or descriptions provided and makes no representation regarding purity, concentration, identity, efficacy, quality, or safety. All information is provided for research reference purposes only, and the Purchaser must conduct independent verification.</li>
								<li><strong>Disclaimer of Warranties:</strong> All Products, materials, Services, and information are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without any express or implied warranties, including but not limited to merchantability, fitness for a particular purpose, title, non-infringement, accuracy, or availability. Enhanced Chem LLC expressly disclaims any representation that any Product is free from defect, contamination, variance, or suitability for any purpose. Products are not for human or animal use, and the Company makes no warranties regarding product performance.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article IX — Confidentiality and Intellectual Property</h2>
							<ol className="list-decimal list-inside space-y-3 text-gray-600 mb-4">
								<li><strong>Confidentiality:</strong> Both parties agree to maintain the confidentiality of any proprietary or non-public information obtained during the course of business and to use such information solely for legitimate business purposes. Enhanced Chem LLC may disclose Purchaser information as required for payment processing, fulfillment, legal compliance, or any other purpose deemed necessary by the Company. The Purchaser shall keep confidential all Confidential Information provided by the Company and shall not disclose, copy, or use such information for any other purpose without the Company&apos;s prior written consent. Breaches will result in injunctive relief, damages, and termination of access. This obligation survives indefinitely.</li>
								<li><strong>Intellectual Property Protection:</strong> All Intellectual Property appearing on the Website or related to Products or Services are the exclusive property of Enhanced Chem LLC or its licensors. Unauthorized reproduction, distribution, modification, or use of any Intellectual Property is strictly prohibited. The Purchaser grants the Company an irrevocable, worldwide, royalty-free license to use, reproduce, and display any content created by the Purchaser in connection with the Website or Products for any purpose. The Purchaser agrees not to challenge the Company&apos;s Intellectual Property rights.</li>
								<li><strong>Limitation on Representations:</strong> No employee, agent, or representative of Enhanced Chem LLC is authorized to make any representation or warranty beyond those expressly stated in this Agreement. Any reliance on informal statements, marketing materials, or communications not included herein is at the Purchaser&apos;s sole risk, and the Purchaser waives any claims arising therefrom.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article X — Governing Law and Dispute Resolution</h2>
							<ol className="list-decimal list-inside space-y-3 text-gray-600 mb-4">
								<li><strong>Governing Law:</strong> This Agreement is governed exclusively by the laws of the State of Florida, without regard to conflict of laws principles.</li>
								<li><strong>Venue for Arbitration and Legal Proceedings:</strong> Any arbitration or legal proceeding arising from or related to this Agreement, the Website, Products, or Services shall be conducted exclusively in Palm Beach County, Florida. The Purchaser consents to personal jurisdiction and venue therein and waives any objections. The Purchaser agrees to service of process by certified mail.</li>
								<li><strong>Mandatory Arbitration:</strong> Any dispute, claim, or controversy arising out of or related to this Agreement, the Website, Products, or Services shall be resolved exclusively through binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules, at the Company&apos;s election. Before initiating any legal action, the Purchaser must provide written notice of any dispute to the Company and allow 60 days for resolution. The prevailing party (as determined by the arbitrator or court) shall recover all costs, including attorneys&apos; fees.</li>
								<li><strong>Waiver of Class Actions:</strong> The Purchaser agrees that all disputes will be conducted only on an individual basis and waives any right to class actions, consolidated actions, or representative actions.</li>
								<li><strong>Waiver of Jury Trial:</strong> TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE PURCHASER HEREBY IRREVOCABLY AND UNCONDITIONALLY WAIVES ANY AND ALL RIGHT TO A TRIAL BY JURY IN ANY LEGAL PROCEEDING, ACTION, CLAIM, OR COUNTERCLAIM ARISING OUT OF, RELATED TO, OR IN CONNECTION WITH THIS AGREEMENT, THE WEBSITE, PRODUCTS, SERVICES, OR ANY DISPUTE WITH THE COMPANY (INCLUDING ANY INDEMNIFIED PARTIES). THE PURCHASER ACKNOWLEDGES AND AGREES THAT THIS WAIVER IS A MATERIAL INDUCEMENT FOR THE COMPANY TO ENTER INTO THIS AGREEMENT AND THAT THEY HAVE HAD THE OPPORTUNITY TO CONSULT WITH LEGAL COUNSEL REGARDING THIS PROVISION. THIS WAIVER APPLIES REGARDLESS OF WHETHER THE DISPUTE IS RESOLVED THROUGH ARBITRATION, LITIGATION, OR ANY OTHER MEANS, AND SURVIVES THE TERMINATION OR EXPIRATION OF THIS AGREEMENT. THE PURCHASER FURTHER AGREES THAT ANY SUCH PROCEEDING SHALL BE TRIED BEFORE A JUDGE OR ARBITRATOR WITHOUT A JURY, AND WAIVES ANY OBJECTION TO THE ENFORCEABILITY OF THIS WAIVER UNDER ANY APPLICABLE LAW, INCLUDING BUT NOT LIMITED TO THE FEDERAL ARBITRATION ACT OR STATE EQUIVALENTS.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article XI — Data Protection and Privacy</h2>
							<p className="text-gray-600 mb-4">
								The Purchaser agrees to comply with all applicable data protection and privacy laws, including but not limited to the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Health Insurance Portability and Accountability Act (HIPAA) where relevant. If the Purchaser collects, processes, or stores any personal data in connection with the Website, Products, or Services, they must implement appropriate technical and organizational security measures to protect such data from unauthorized access, disclosure, or loss. The Purchaser shall promptly report any data breaches to the Company within 24 hours and cooperate fully in any investigation. The Purchaser consents to the Company processing their personal data as necessary for the Website, Products, Services, verification, compliance, and any other purposes, and indemnifies the Company against any Claims arising from the Purchaser&apos;s handling of data.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article XII — Miscellaneous</h2>
							<ol className="list-decimal list-inside space-y-3 text-gray-600 mb-4">
								<li><strong>Authority; Account Security:</strong> The individual placing an order or using the Website represents and warrants that they are authorized to bind the Purchaser and that all information provided is accurate, complete, and current. The Purchaser is responsible for maintaining the security of Account credentials and for all activity conducted under its Account. Enhanced Chem LLC is not liable for unauthorized or fraudulent use of any Purchaser Account, and the Purchaser indemnifies the Company against any related Claims.</li>
								<li><strong>Assignment; Successors; No Third-Party Beneficiaries:</strong> The Purchaser may not assign this Agreement or any rights hereunder without the prior written consent of Enhanced Chem LLC. The Company may assign this Agreement freely. This Agreement shall be binding upon and inure to the benefit of the parties and their permitted successors and assigns. No third party shall have any rights or claims under this Agreement.</li>
								<li><strong>Headings; Severability; Non-Waiver:</strong> Headings are for convenience only and shall not affect interpretation. If any provision is held invalid or unenforceable, the remainder shall continue in full force. The Company may replace the invalid provision with one that reflects the original intent. Failure by Enhanced Chem LLC to enforce any right or provision shall not constitute a waiver of such right.</li>
								<li><strong>Survival:</strong> All disclaimers, indemnifications, limitations of liability, waivers, confidentiality provisions, intellectual property rights, and any other sections that by their nature should survive shall do so indefinitely, including but not limited to Articles IV, V, IX, X, and XI.</li>
								<li><strong>Entire Agreement:</strong> This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements, representations, or understandings. No modifications except in writing signed by the Company.</li>
								<li><strong>No Modification Without Written Consent:</strong> No modification or waiver of this Agreement shall be valid unless made in writing and signed by an authorized representative of Enhanced Chem LLC.</li>
								<li><strong>Digital Acceptance:</strong> By clicking &quot;I Agree,&quot; submitting an order, or completing checkout, the Purchaser affirms their electronic acceptance of this Agreement pursuant to the U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN Act) and related laws.</li>
								<li><strong>Force Majeure:</strong> The Company shall not be liable for any delays or failures due to events beyond its control, including acts of God, pandemics, wars, strikes, regulatory changes, supply issues, or any other force majeure event.</li>
								<li><strong>Notices:</strong> All notices to the Company must be in writing via email to contact@enhancedchem.com or certified mail to 7901 4TH ST N STE 300, ST. PETERSBURG, FL 33702. Notices to the Purchaser may be via email or mail to the information provided.</li>
								<li><strong>Representations and Warranties:</strong> The Purchaser represents and warrants to the Company that: (i) they have the full legal right, power, and authority to enter into this Agreement and perform their obligations hereunder; (ii) their use of the Website, Products, and Services will comply with all applicable laws, regulations, and industry standards; (iii) all information provided to the Company, including personal, payment, and affiliation details, is accurate, complete, and current; (iv) their activities do not infringe any third-party intellectual property rights or contain unlawful, defamatory, or harmful content; (v) they will not engage in any conduct that could damage the Company&apos;s reputation; and (vi) they have obtained all necessary consents, licenses, and approvals required for their activities under this Agreement. These representations and warranties survive the termination or expiration of this Agreement.</li>
								<li><strong>No Company Liability for Third-Party Actions:</strong> The Company assumes no responsibility or liability for any actions, omissions, or compliance failures by third parties, including carriers, payment processors, or any entities involved in the supply chain. The Purchaser bears all risks associated with third-party interactions and indemnifies the Company against related Claims.</li>
								<li><strong>Audit Rights:</strong> The Company reserves the right to audit the Purchaser&apos;s activities, records, and compliance with this Agreement at any time, with or without notice. The Purchaser must provide full access and cooperation within 24 hours of request, at their sole expense. Failure to comply will result in immediate Account termination, order cancellation, and potential legal action.</li>
							</ol>
						</section>

						<section className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Article XIII — Contact Information</h2>
							<p className="text-gray-600 mb-4 font-medium">Enhanced Chem LLC</p>
							<p className="text-gray-600 mb-1">7901 4TH ST N STE 300</p>
							<p className="text-gray-600 mb-1">ST. PETERSBURG, FL 33702</p>
							<p className="text-gray-600 mb-1">Email: contact@enhancedchem.com</p>
							<p className="text-gray-600 mb-4">Website: https://www.enhancedchem.com</p>
						</section>

						<section className="mb-4">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">FINAL DISCLAIMER</h2>
							<div className="bg-red-50 border border-red-200 rounded-lg p-4">
								<p className="text-red-800 font-semibold mb-2">⚠️ IMPORTANT</p>
								<p className="text-red-700">
									All Products sold by Enhanced Chem LLC are strictly for research and laboratory use only. They are not for human or animal consumption, ingestion, injection, topical application, or any form of administration to living beings. Misuse of these materials can result in serious harm or death. By purchasing or handling these materials, you expressly acknowledge and accept all risks and agree to indemnify and hold harmless Enhanced Chem LLC and the Indemnified Parties against any resulting Claim, injury, or loss. The Company disclaims all liability for any use or misuse, and the Purchaser assumes all responsibility.
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}
