import React, { useState } from 'react';
import { X, Download, Printer, CheckCircle2, Award, Briefcase, GraduationCap, Phone, Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, EXPERIENCES_DATA, SKILLS_DATA, CERTIFICATES_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Direct print failed, generating printable PDF fallback', e);
      handleDownloadPdf();
    }
  };

  const handleDownloadPdf = () => {
    try {
      setIsGeneratingPdf(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 14;
      const contentWidth = pageWidth - margin * 2;
      let y = 16;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - 14) {
          doc.addPage();
          y = 16;
        }
      };

      // Header Bar
      doc.setFillColor(15, 35, 75); // Dark Navy #0f234b
      doc.rect(margin, y, contentWidth, 24, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(PERSONAL_INFO.name.toUpperCase(), margin + 6, y + 9);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(210, 230, 255);
      doc.text(PERSONAL_INFO.role.toUpperCase(), margin + 6, y + 15);
      doc.text('6+ Years Professional Experience', margin + 6, y + 20);

      y += 28;

      // Contact Information Bar
      doc.setFontSize(8);
      doc.setTextColor(60, 70, 85);
      doc.setFont('helvetica', 'normal');
      const contactText = `${PERSONAL_INFO.address} | Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}`;
      doc.text(contactText, margin, y);
      y += 5;

      doc.setDrawColor(200, 215, 235);
      doc.line(margin, y, margin + contentWidth, y);
      y += 6;

      // Section: Professional Summary
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 35, 75);
      doc.text('PROFESSIONAL SUMMARY', margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(50, 60, 70);
      const summaryLines = doc.splitTextToSize(PERSONAL_INFO.tagline, contentWidth);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 4.2 + 4;

      // Section: Core Skills
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 35, 75);
      doc.text('CORE COMPETENCIES & TECHNICAL PROFICIENCIES', margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(50, 60, 70);

      const skillGroups = [
        'Programming & Scripting: Python, SQL, JavaScript/React, Shell Scripting',
        'AI & Orchestration: Agentic AI Workflows, LLM Orchestration (Llama 3, Gemini, Claude, Open Claw), RAG, Prompt Engineering, Tool Calling',
        'Automation: n8n (Advanced Logic/Code Nodes), n8n Worker/Dispatcher patterns',
        'Data Engineering: Pipeline Automation, ETL/ELT Processes, API Integration (JSON handling), Data Preprocessing',
        'Systems & Cloud: Azure (Data Factory, Databricks, Data Lake, SQL), Google BigQuery, NextBank CBS, Cloud Run, Looker Studio, Supabase',
        'Analytics & Operations: Root-cause analysis, Dashboard Automation, Incident Management, Monitoring, Performance Testing'
      ];

      skillGroups.forEach((group) => {
        checkPageBreak(5);
        const lines = doc.splitTextToSize(`• ${group}`, contentWidth);
        doc.text(lines, margin, y);
        y += lines.length * 4;
      });

      y += 3;

      // Section: Professional Experience
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 35, 75);
      doc.text('PROFESSIONAL EMPLOYMENT HISTORY', margin, y);
      y += 5;

      EXPERIENCES_DATA.forEach((exp) => {
        checkPageBreak(30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 35, 75);
        doc.text(`${exp.role} - ${exp.company}`, margin, y);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(100, 110, 125);
        doc.text(exp.period, margin + contentWidth - doc.getTextWidth(exp.period), y);
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(55, 65, 75);
        const descLines = doc.splitTextToSize(exp.description, contentWidth);
        doc.text(descLines, margin, y);
        y += descLines.length * 3.8 + 2;

        exp.achievements.forEach((ach) => {
          checkPageBreak(6);
          const achLines = doc.splitTextToSize(`- ${ach}`, contentWidth - 4);
          doc.text(achLines, margin + 2, y);
          y += achLines.length * 3.8;
        });

        y += 3;
      });

      // Section: Certifications
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 35, 75);
      doc.text('CERTIFICATIONS & COMPLIANCE', margin, y);
      y += 5;

      CERTIFICATES_DATA.forEach((cert) => {
        checkPageBreak(6);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 45, 65);
        doc.text(`• ${cert.title} [${cert.code}]`, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 110, 125);
        doc.text(`- ${cert.issuer} (${cert.date})`, margin + 115, y);
        y += 4.5;
      });

      y += 3;

      // Section: Education
      checkPageBreak(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 35, 75);
      doc.text('EDUCATION & BACKGROUND', margin, y);
      y += 5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 45, 65);
      doc.text(PERSONAL_INFO.education.degree, margin, y);
      y += 4.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(70, 80, 95);
      doc.text(`${PERSONAL_INFO.education.school} • ${PERSONAL_INFO.education.location} • Graduated: ${PERSONAL_INFO.education.year}`, margin, y);
      y += 5;

      // Languages
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 45, 65);
      doc.text(`Languages: ${PERSONAL_INFO.languages.join(', ')}`, margin, y);

      // Save PDF
      doc.save('James_Elliot_A_Ciano_Curriculum_Vitae.pdf');
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="resume-view-modal"
        className="glass-subcard max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white max-h-[92vh] flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Quick Actions */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/90 no-print">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-800">
              Curriculum Vitae • {PERSONAL_INFO.name}
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              6+ Years Exp
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer active:scale-98"
              title="Download official PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs transition-colors cursor-pointer flex items-center gap-1"
              title="Print Curriculum Vitae"
            >
              <Printer className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content / Printable Area */}
        <div id="printable-cv-area" className="overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-6 text-slate-800 font-['Poppins'] bg-white">
          {/* Top Identity Header */}
          <div className="border-b border-slate-200 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                  {PERSONAL_INFO.role}
                </p>
              </div>
              <div className="text-xs text-slate-500 sm:text-right font-medium">
                <span className="inline-block bg-blue-50 text-blue-800 font-bold px-2.5 py-1 rounded-md border border-blue-100">
                  Total Experience: 6 Years
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{PERSONAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Languages: {PERSONAL_INFO.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Professional Profile Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Professional Profile Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              Core Competencies & Tools
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Programming & AI</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  Python, SQL, JavaScript/React, Shell Scripting, Agentic AI Workflows, LLM Orchestration (Llama 3, Gemini, Claude, Open Claw), RAG, Prompt Engineering, Tool Calling.
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Automation & Integration</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  n8n (Advanced Logic/Code Nodes), Worker/Dispatcher patterns, REST API Integrations, JSON data handling & stream preprocessing.
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Data Engineering & Analytics</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  Pipeline Automation, ETL/ELT Processes, NextBank Core Banking System (CBS), Google BigQuery, Cloud Run, Looker Studio dashboards.
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Cloud Platforms & Diagnostics</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  Azure Data Factory, Databricks, Azure Data Lake, Azure SQL, Apache Airflow, Incident Management, Root-cause analysis.
                </div>
              </div>
            </div>
          </div>

          {/* Professional Work History */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              Professional Employment History
            </h4>
            <div className="space-y-4">
              {EXPERIENCES_DATA.map((exp, i) => (
                <div key={i} className="text-xs border-l-2 border-blue-500 pl-3.5 py-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-slate-900 text-sm">
                    <span>{exp.role}</span>
                    <span className="text-xs font-semibold text-blue-700">{exp.period}</span>
                  </div>
                  <div className="text-blue-700 font-semibold mb-1">{exp.company}</div>
                  <p className="text-slate-700 mb-2 leading-relaxed">{exp.description}</p>
                  <div className="space-y-1">
                    {exp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Certifications & Compliance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATES_DATA.map((c) => (
                <div key={c.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-white p-0.5 shadow-2xs shrink-0 flex items-center justify-center">
                    <img src={c.badgeUrl} alt={c.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{c.title}</div>
                    <div className="text-slate-500 text-[11px] font-medium">{c.issuer} • Code: {c.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Background */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              Education & Background
            </h4>
            <div className="text-xs p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">
                {PERSONAL_INFO.education.degree}
              </div>
              <div className="text-slate-600 mt-0.5">
                {PERSONAL_INFO.education.school} • {PERSONAL_INFO.education.location}
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Completed: {PERSONAL_INFO.education.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
