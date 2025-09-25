export default function DisclaimerPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Research Disclaimer
				</h1>
				
				<div className="bg-white rounded-lg shadow-sm p-8">
					<div className="prose max-w-none">
						<div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
							<h2 className="text-2xl font-semibold text-red-800 mb-4">
								⚠️ CRITICAL RESEARCH DISCLAIMER
							</h2>
							<p className="text-red-700 text-lg font-semibold">
								ALL PRODUCTS SOLD BY ENHANCED CHEM ARE FOR RESEARCH PURPOSES ONLY. 
								THESE PRODUCTS ARE NOT INTENDED FOR HUMAN CONSUMPTION.
							</p>
						</div>

						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Research Use Only
						</h2>
						<p className="text-gray-600 mb-6">
							All peptides and research chemicals sold by Enhanced Chem are intended exclusively 
							for laboratory research purposes. These products are NOT approved by the FDA for 
							human consumption and are NOT intended for:
						</p>
						<ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
							<li>Human consumption or ingestion</li>
							<li>Diagnosis, treatment, cure, or prevention of any disease</li>
							<li>Cosmetic or therapeutic applications</li>
							<li>Veterinary use</li>
							<li>Any other non-research purposes</li>
						</ul>

						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Customer Certification
						</h2>
						<p className="text-gray-600 mb-6">
							By purchasing products from Enhanced Chem, you certify that:
						</p>
						<ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
							<li>You are at least 18 years of age</li>
							<li>You are a qualified researcher or scientist</li>
							<li>You have the necessary training and equipment to handle these products safely</li>
							<li>You will use these products only for legitimate research purposes</li>
							<li>You understand the risks associated with handling research chemicals</li>
							<li>You will comply with all applicable local, state, and federal laws</li>
						</ul>

						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Safety and Handling
						</h2>
						<p className="text-gray-600 mb-6">
							Research peptides and chemicals should be handled with appropriate safety precautions:
						</p>
						<ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
							<li>Use proper personal protective equipment (PPE)</li>
							<li>Work in a well-ventilated laboratory environment</li>
							<li>Follow proper storage and disposal procedures</li>
							<li>Keep products out of reach of children and pets</li>
							<li>Do not ingest, inhale, or apply topically</li>
						</ul>

						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Legal Compliance
						</h2>
						<p className="text-gray-600 mb-6">
							Customers are responsible for ensuring compliance with all applicable laws and 
							regulations in their jurisdiction. Enhanced Chem does not provide legal advice 
							regarding the legality of our products in specific locations.
						</p>

						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Limitation of Liability
						</h2>
						<p className="text-gray-600 mb-6">
							Enhanced Chem disclaims all liability for any misuse of our products. We are not 
							responsible for any consequences resulting from improper use, handling, or storage 
							of our research products.
						</p>

						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Quality and Purity
						</h2>
						<p className="text-gray-600 mb-6">
							While we strive to provide the highest quality research products, we make no 
							warranties regarding the purity, efficacy, or safety of our products for any 
							specific research application. Customers should conduct their own quality 
							assurance testing as appropriate for their research needs.
						</p>

						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Contact Information
						</h2>
						<p className="text-gray-600">
							If you have any questions about this research disclaimer or our products, 
							please contact us at:
							<br />
							Email: research@enhancedchem.com
							<br />
							Phone: 1-800-ENHANCED
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
