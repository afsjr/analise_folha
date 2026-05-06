import csv
import json
import os
from datetime import datetime
from pathlib import Path

def parse_valor(val):
    if not val:
        return 0.0
    val = str(val).strip()
    if val in ('0', '0,00', 'R$ 0,00', '-', '', '  -'):
        return 0.0
    val = val.replace('R$', '').replace('.', '').replace(',', '.').strip()
    try:
        return float(val)
    except:
        return 0.0

def detectar_categoria(nome_linha):
    nome_linha = nome_linha.upper() if nome_linha else ''
    if 'NÍVEL 1' in nome_linha or 'NÍVEL 1' in nome_linha:
        return 'Professores Nível 1'
    elif 'NÍVEL II' in nome_linha or 'NÍVEL 2' in nome_linha:
        return 'Professores Nível 2'
    elif 'ADMINISTRATIVO' in nome_linha or nome_linha == 'ADMINISTRATIVO':
        return 'Administrativo'
    elif 'ENFERMAGEM' in nome_linha:
        return 'Enfermagem'
    elif 'UNOPAR' in nome_linha:
        return 'UNOPAR'
    return None

def detectar_segmento(cargo, nome, categoria):
    cargo = str(cargo).upper() if cargo else ''
    nome = str(nome).upper() if nome else ''
    categoria = str(categoria) if categoria else ''
    
    if not cargo:
        return 'Outros'
    
    # Primeiro verificar categoria específica
    if categoria == 'UNOPAR':
        return 'UNOPAR'
    if categoria == 'Enfermagem':
        return 'Enfermagem'
    if categoria == 'Administrativo':
        return 'Administrativo'
    
    # Educação Infantil
    if 'INFANTIL' in cargo or 'AEE' in cargo:
        return 'Infantil'
    
    # Ensino Fundamental I (1º ao 5º ano)
    if any(f'{i}º ANO' in cargo for i in range(1, 6)):
        return 'Fundamental I'
    if '1º AO 5º' in cargo:
        return 'Fundamental I'
    
    # Ensino Fundamental II (6º ao 9º ano)
    if any(f'{i}º ANO' in cargo for i in range(6, 10)):
        return 'Fundamental II'
    if '6º AO 9º' in cargo:
        return 'Fundamental II'
    if '9º ANO' in cargo:
        return 'Fundamental II'
    
    # Ensino Médio
    if 'ENSINO MÉDIO' in cargo or 'MÉDIO' in cargo:
        return 'Ensino Médio'
    
    # Monitor / Apoio escolar
    if 'MONITOR' in cargo:
        return 'Monitoria'
    if 'PRECEPTOR' in cargo:
        return 'Monitoria'
    
    # Coordenação
    if 'COORD' in cargo:
        return 'Coordenação'
    
    # Administrativo e apoio
    if any(x in cargo for x in ['SECRETÁRI', 'PORTARI', 'ESTAGIÁRI', 'PSICÓLOG']):
        return 'Administrativo'
    if 'AUX' in cargo or 'SERVICOS' in cargo or 'AUX DE' in cargo:
        return 'Administrativo'
    
    # Professores específicos (disciplinas)
    if any(x in cargo for x in ['PORTUGUÊS', 'GEOGRAFIA', 'HISTÓRIA', 'MATEMÁTICA', 'INGLÊS', 'CIÊNCIAS', 'ED. FÍSICA', 'ARTE']):
        return 'Docentes'
    
    # Empreendedorismo
    if 'EMPREENDEDOR' in cargo:
        return 'Docentes'
    
    return 'Outros'

def processar_csv(csv_path, mes_ref):
    data = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        rows = list(reader)
    
    categoria_atual = 'Professores Nível 1'
    
    for row in rows:
        if len(row) < 16:
            continue
        
        nome = str(row[0]).strip()
        if not nome:
            continue
        
        cat = detectar_categoria(row[0])
        if cat:
            categoria_atual = cat
            continue
        
        if nome.startswith(',') or nome in ('Total', 'Soma Salários', 'LISTA DE FUNCIONARIOS'):
            continue
        
        total_bruto = parse_valor(row[10])
        valor_liquido = parse_valor(row[15])
        
        if total_bruto > 0 or valor_liquido > 0:
            cargo = row[1].strip() if len(row) > 1 else ''
            segmento = detectar_segmento(cargo, nome, categoria_atual)
            
            data.append({
                'nome': nome,
                'cargo': cargo,
                'segmento': segmento,
                'categoria': categoria_atual,
                'mes': mes_ref,
                'aulas_semanais': row[2].strip() if len(row) > 2 else '0',
                'salario': parse_valor(row[3]),
                'adicional_graduacao': parse_valor(row[4]),
                'adicional_pos': parse_valor(row[5]),
                'salario_familia': parse_valor(row[6]),
                'adicional_passagem': parse_valor(row[7]),
                'gratificacao_5': parse_valor(row[8]),
                'gratificacao_35': parse_valor(row[9]),
                'total_bruto': total_bruto,
                'inss': parse_valor(row[11]),
                'passagem': parse_valor(row[12]),
                'adicionais': parse_valor(row[13]),
                'creditos_extras': parse_valor(row[14]),
                'total_liquido': valor_liquido
            })
    
    return data

# Processar todos os arquivos
arquivos_meses = [
    ('arquivobruto/Planilha Cód.17.493 Colégio Santa Mônica Limoeiro 21.08.2025 - FolhaFEV 26.csv', '2026-02'),
    ('arquivobruto/Planilha Cód.17.493 Colégio Santa Mônica Limoeiro 21.08.2025 - Folha MAR 26.csv', '2026-03'),
    ('arquivobruto/Planilha Cód.17.493 Colégio Santa Mônica Limoeiro 21.08.2025 - Folha ABR 26.csv', '2026-04')
]

all_data = []
for csv_path, mes in arquivos_meses:
    if os.path.exists(csv_path):
        print(f'Processando: {csv_path}')
        data = processar_csv(csv_path, mes)
        all_data.extend(data)
        print(f'  -> {len(data)} registros')

# Salvar JSON consolidado
with open('data/folha_completa.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print(f'\nTotal registros: {len(all_data)}')

# Análise por segmento (mês atual)
mes_atual = '2026-04'
dados_mes = [d for d in all_data if d['mes'] == mes_atual]

print(f'\n=== ANÁLISE POR SEGMENTO ({mes_atual}) ===')
segmentos = {}
for d in dados_mes:
    seg = d['segmento']
    if seg not in segmentos:
        segmentos[seg] = {'count': 0, 'bruto': 0, 'liquido': 0}
    segmentos[seg]['count'] += 1
    segmentos[seg]['bruto'] += d['total_bruto']
    segmentos[seg]['liquido'] += d['total_liquido']

for seg in sorted(segmentos.keys()):
    s = segmentos[seg]
    print(f'{seg}: {s["count"]} func | Bruto: R$ {s["bruto"]:.2f} | Líquido: R$ {s["liquido"]:.2f}')

# Totais
print(f'\nTOTAL: {sum(s["count"] for s in segmentos.values())} func | Bruto: R$ {sum(s["bruto"] for s in segmentos.values()):.2f} | Líquido: R$ {sum(s["liquido"] for s in segmentos.values()):.2f}')

# Salvar mês atual separately
with open('data/folha.json', 'w', encoding='utf-8') as f:
    json.dump(dados_mes, f, ensure_ascii=False, indent=2)

print(f'\nJSON Atualizado: data/folha.json ({len(dados_mes)} registros)')