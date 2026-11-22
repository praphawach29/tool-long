import json
from pathlib import Path

import torch
import whisper


ROOT = Path(__file__).resolve().parents[1]


def main():
    audio = ROOT / 'public' / 'meeting-fixture.mp3'
    if not audio.is_file() or not audio.stat().st_size:
        raise SystemExit(f'Missing audio fixture: {audio}')
    torch.set_num_threads(6)
    model = whisper.load_model('base', device='cpu')
    result = model.transcribe(str(audio), language='th', task='transcribe', fp16=False, temperature=0)
    (ROOT / 'content' / 'transcript-raw.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(result['text'], ensure_ascii=False))


if __name__ == '__main__':
    main()
