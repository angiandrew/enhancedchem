import { Microscope, Award, Shield, Users } from 'lucide-react'

export default function AboutPage() {
	const achievements = [
		{
			icon: Microscope,
			title: "Advanced Research Facilities",
			description: "State-of-the-art laboratories equipped with cutting-edge analytical instruments including HPLC, mass spectrometry, and nuclear magnetic resonance (NMR) spectroscopy for comprehensive peptide characterization and purity analysis."
		},
		{
			icon: Award,
			title: "Scientific Excellence",
			description: "Our research team consists of PhD-level chemists and biochemists with over 50 years of combined experience in peptide synthesis, purification, and analytical chemistry. We maintain the highest standards of scientific rigor."
		},
		{
			icon: Shield,
			title: "Quality Assurance",
			description: "Every batch undergoes rigorous third-party testing and validation. We provide comprehensive certificates of analysis (COA) with detailed purity profiles, molecular weight confirmation, and stability data."
		},
		{
			icon: Users,
			title: "Research Community",
			description: "We serve the global scientific research community, supporting academic institutions, pharmaceutical companies, and independent researchers in advancing peptide-based therapeutic research and development."
		}
	]

	return (
		<div className="min-h-screen scientific-theme relative">
			<div className="relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					{/* Header */}
					<div className="text-center mb-16">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 drop-shadow-sm">
							About Enhanced Chem
						</h1>
						<p className="text-xl text-gray-700 max-w-3xl mx-auto drop-shadow-sm">
							Leading the advancement of peptide research through cutting-edge synthesis, 
							rigorous quality control, and unwavering commitment to scientific excellence.
						</p>
					</div>

					{/* Mission Statement */}
					<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 mb-16 shadow-lg">
						<h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
							Our Mission
						</h2>
						<div className="prose max-w-none text-lg text-gray-700 leading-relaxed">
							<p className="mb-6">
								Enhanced Chem is dedicated to advancing the field of peptide research by providing 
								high-purity, research-grade peptides to the global scientific community. Our mission 
								is to accelerate breakthrough discoveries in therapeutic peptide development through 
								uncompromising quality, innovative synthesis methodologies, and comprehensive 
								analytical support.
							</p>
							<p className="mb-6">
								We understand that research peptides are the foundation of modern therapeutic 
								development, from cancer research to regenerative medicine. Our commitment to 
								scientific integrity ensures that every product meets the stringent requirements 
								of peer-reviewed research and clinical studies.
							</p>
							<p>
								Through continuous investment in research and development, we maintain our position 
								as the trusted partner for researchers worldwide who depend on reliable, high-quality 
								peptide compounds for their critical scientific investigations.
							</p>
						</div>
					</div>

					{/* Achievements */}
					<div className="mb-16">
						<h2 className="text-3xl font-bold text-gray-900 mb-12 text-center drop-shadow-sm">
							Scientific Excellence
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{achievements.map((achievement, index) => (
								<div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
									<div className="flex items-start space-x-4">
										<div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
											<achievement.icon className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h3 className="text-xl font-semibold text-gray-900 mb-3">
												{achievement.title}
											</h3>
											<p className="text-gray-700 leading-relaxed">
												{achievement.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Research Focus */}
					<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 mb-16 shadow-lg">
						<h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
							Research Focus Areas
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<Microscope className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Therapeutic Peptides
								</h3>
								<p className="text-gray-700 text-sm">
									Specialized synthesis of bioactive peptides for cancer research, 
									immunotherapy, and regenerative medicine applications.
								</p>
							</div>
							<div className="text-center">
								<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<Award className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Analytical Services
								</h3>
								<p className="text-gray-700 text-sm">
									Comprehensive characterization including purity analysis, 
									sequence verification, and stability testing protocols.
								</p>
							</div>
							<div className="text-center">
								<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<Shield className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Quality Control
								</h3>
								<p className="text-gray-700 text-sm">
									Rigorous testing protocols ensuring batch-to-batch consistency 
									and compliance with international research standards.
								</p>
							</div>
						</div>
					</div>

					{/* Research Disclaimer */}
					<div className="bg-red-50 border border-red-200 rounded-lg p-6">
						<h3 className="text-lg font-semibold text-red-800 mb-2">
							⚠️ Research Purposes Only
						</h3>
						<p className="text-red-700">
							All products and services are intended exclusively for research purposes. 
							Not for human consumption, diagnosis, treatment, cure, or prevention of any disease. 
							By engaging with our services, you certify that you are conducting legitimate 
							scientific research in accordance with applicable laws and regulations.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}











